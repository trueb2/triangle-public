import Ember from 'ember';

const { inject: { service }, isEmpty, RSVP } = Ember;

export default Ember.Service.extend({
  session: service('session'),
  store: service(),

  load() {
    const _this = this;
    let authenticated = _this.get('session.data.authenticated');
    if(!isEmpty(authenticated)) {
      return RSVP.Promise.all([
        _this.set('email', authenticated.email),
        _this.set('isAdmin', authenticated.role_name === 'admin')
      ]);
    }
    return RSVP.resolve();
  }
});
