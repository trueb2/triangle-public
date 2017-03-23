import Ember from 'ember';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';
import fetch from 'ember-network/fetch';
import config from 'frontend/config/environment';

const { RSVP: { Promise }, isEmpty, run, assign: emberAssign, merge, computed } = Ember;
const assign = emberAssign || merge;

const JSON_CONTENT_TYPE = 'application/json';

/**
  Authenticator that works with the Ruby gem
  [devise](https://github.com/plataformatec/devise).
  __As token authentication is not actually part of devise anymore, the server
  needs to implement some customizations__ to work with this authenticator -
  see [this gist](https://gist.github.com/josevalim/fb706b1e933ef01e4fb6).
  @class DeviseAuthenticator
  @module ember-simple-auth/authenticators/devise
  @extends BaseAuthenticator
  @public
*/
export default BaseAuthenticator.extend({
  /**
    The endpoint on the server that the authentication request is sent to.
    @property serverTokenEndpoint
    @type String
    @default '/users/sign_in'
    @public
  */
  serverTokenEndpoint: config.host + '/api/devise/sign_in',

  /**
    The devise resource name. __This will be used in the request and also be
    expected in the server's response.__
    @property resourceName
    @type String
    @default 'user'
    @public
  */
  resourceName: 'user',

  /**
    The token attribute name. __This will be used in the request and also be
    expected in the server's response.__
    @property tokenAttributeName
    @type String
    @default 'token'
    @public
  */
  tokenAttributeName: 'authentication_token',

  /**
    The identification attribute name. __This will be used in the request and
    also be expected in the server's response.__
    @property identificationAttributeName
    @type String
    @default 'email'
    @public
  */
  identificationAttributeName: 'email',

  /**
    When authentication fails, the rejection callback is provided with the whole
    XHR object instead of it's response JSON or text.
    This is useful for cases when the backend provides additional context not
    available in the response body.
    @property rejectWithXhr
    @type Boolean
    @default false
    @deprecated DeviseAuthenticator/rejectWithResponse:property
    @public
  */
  rejectWithXhr: computed.deprecatingAlias('rejectWithResponse'),

  /**
    When authentication fails, the rejection callback is provided with the whole
    fetch response object instead of it's response JSON or text.
    This is useful for cases when the backend provides additional context not
    available in the response body.
    @property rejectWithResponse
    @type Boolean
    @default false
    @public
  */
  rejectWithResponse: false,

  /**
    Restores the session from a session data object; __returns a resolving
    promise when there are non-empty
    {{#crossLink "DeviseAuthenticator/tokenAttributeName:property"}}token{{/crossLink}}
    and
    {{#crossLink "DeviseAuthenticator/identificationAttributeName:property"}}identification{{/crossLink}}
    values in `data`__ and a rejecting promise otherwise.
    @method restore
    @param {Object} data The data to restore the session from
    @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming or remaining authenticated
    @public
  */
  restore(data) {
    return Promise.resolve(data);
  },

  /**
    Authenticates the session with the specified `identification` and
    `password`; the credentials are `POST`ed to the
    {{#crossLink "DeviseAuthenticator/serverTokenEndpoint:property"}}server{{/crossLink}}.
    If the credentials are valid the server will responds with a
    {{#crossLink "DeviseAuthenticator/tokenAttributeName:property"}}token{{/crossLink}}
    and
    {{#crossLink "DeviseAuthenticator/identificationAttributeName:property"}}identification{{/crossLink}}.
    __If the credentials are valid and authentication succeeds, a promise that
    resolves with the server's response is returned__, otherwise a promise that
    rejects with the server error is returned.
    @method authenticate
    @param {String} identification The user's identification
    @param {String} password The user's password
    @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming authenticated
    @public
  */
  authenticate(identification, password) {
    return new Promise((resolve, reject) => {
      const useResponse = this.get('rejectWithResponse');
      const { resourceName, identificationAttributeName, tokenAttributeName } = this.getProperties('resourceName', 'identificationAttributeName', 'tokenAttributeName');
      const data         = {};
      data[resourceName] = { password };
      data[resourceName][identificationAttributeName] = identification;

      this.makeRequest(data).then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            const payload = this.valid_payload(json.data);
            if (!isEmpty(payload)) {
              run(null, resolve, payload);
            } else {
              run(null, reject, `Check that server response includes ${tokenAttributeName} and ${identificationAttributeName}`);
            }
          });
        } else {
          if (useResponse) {
            run(null, reject, response);
          } else {
            response.json().then((json) => run(null, reject, json));
          }
        }
      }).catch((error) => run(null, reject, error));
    });
  },

  /**
    Does nothing
    @method invalidate
    @return {Ember.RSVP.Promise} A resolving promise
    @public
  */
  invalidate() {
    return Promise.resolve();
  },

  /**
    Makes a request to the devise server.
    @method makeRequest
    @param {Object} data The request data
    @param {Object} options request options that are passed to `fetch`
    @return {Promise} The promise returned by `fetch`
    @protected
  */
  makeRequest(data, options = {}) {
    let url = options.url || this.get('serverTokenEndpoint');
    let requestOptions = {};
    let body = JSON.stringify(data);
    assign(requestOptions, {
      body,
      method:   'POST',
      headers:  {
        'accept':       JSON_CONTENT_TYPE,
        'content-type': JSON_CONTENT_TYPE
      }
    });
    assign(requestOptions, options || {});

    return fetch(url, requestOptions);
  },

  valid_payload(data) {
    const identification = 'email';
    const token = 'authentication-token';
    const _attrs = data.attributes || {};
    if(!isEmpty(_attrs) &&
     !isEmpty(_attrs[identification]) &&
     !isEmpty(_attrs[token])) {
       const payload = {};
       payload['id'] = data.id;
       payload['authentication_token'] = data.attributes[token];
       payload['email'] = data.attributes[identification];
       payload['role_name'] = data.attributes['role-name'];
       return payload;
     } else {
       return undefined;
     }
  }
});
