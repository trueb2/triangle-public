import Ember from 'ember';
const get = Ember.get;
const set = Ember.set;

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  eventImages: Ember.computed.filterBy('model', 'image_purpose', 0),
  brotherImages: Ember.computed.filterBy('model', 'image_purpose', 1),
  actions: {
    uploadImage: function (file) {
      var _this = this;
      var image = _this.get('store').createRecord('image', {
        image_purpose: 0
      });

      file.read().then(function (url) {
        if (get(image, 'url') == null) {
          set(image, 'url', url);
        }
      });

      let headers={};
      this.get('session').authorize('authorizer:devise', (headerName, headerValue) => {
        headers[headerName] = headerValue;
      });

      let image_purpose = 0;
      if(this.get('toggleValue') === 'isBro') {
        image_purpose = 1;
      }
      const settings = {headers: headers, data: {image_purpose: image_purpose}};
      file.upload('/api/images', settings).then(function (response) {
        _this.get('target.router').refresh();
      }, function () {
        image.destroyRecord();
      });
    }
  }

});
