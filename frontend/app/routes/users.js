import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: Ember.inject.service('current-user'),
  beforeModel(transition) {
    if(!this.get('currentUser.isAdmin')){
      transition.abort();
    }
  },
  model() {
    Ember.run.schedule('afterRender', () => this.set('filterBy', false));
    return this.get('store').findAll('user');
  }
});
