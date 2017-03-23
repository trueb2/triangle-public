import Ember from 'ember';
import eventsTransition from '../helpers/events-transition';
import execbTransition from '../helpers/execb-transition';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  currentUser: Ember.inject.service('current-user'),
  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    },
    eventsTransition() {
      eventsTransition(this);
    },
    execbTransition() {
      execbTransition(this);
    },
    loginTransition() {
      this.transitionToRoute('login');
    },
    signUpTransition() {
      this.transitionToRoute('sign-up');
    },
    dirTransition() {
      this.transitionToRoute('dir');
    },
    eventEditingTransition() {
      this.transitionToRoute('events');
    },
    imageUploadingTransition() {
      this.transitionToRoute('images');
    },
    userManagementTransition() {
      this.transitionToRoute('users');
    }
  }
});
