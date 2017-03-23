import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return Ember.RSVP.hash({
      brother: this.get('store').findRecord('brother', params.brother_id),
      images: this.get('store').query('image', {unused: 1})
    });
  }
});
