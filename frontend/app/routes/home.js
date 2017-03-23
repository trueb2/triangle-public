import Ember from 'ember';
import RSVP from 'rsvp';
import config from 'frontend/config/environment';

export default Ember.Route.extend({
  model() {
    var _this = this;
    return Ember.$.getJSON(config.host+'/api/home')
    .then(function(json) {
      var store = _this.get('store');
      var inflector = Ember.Inflector.inflector;
      for(var modelName in json) {
        var singular = inflector.singularize(modelName);
        var modelPayload = Ember.makeArray(json[modelName].data);
        modelPayload.forEach(function(obj) {
          var normalizedPayload = store.normalize(singular, obj);
          store.push(normalizedPayload);
        });
      }
    })
    .then(function() {
      return RSVP.hash({
        semester: _this.get('store').peekAll('semester'),
        jobs: _this.get('store').peekAll('job'),
        brothers: _this.get('store').peekAll('brother'),
        events: _this.get('store').peekAll('event'),
        images: _this.get('store').peekAll('image')
      });
    });
  }
});
