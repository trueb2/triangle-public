import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    loginAction() {
      let { email, password } = this.getProperties('email', 'password');
      this.get('session').authenticate('authenticator:devise', email, password)
      .catch((reason) => {
        this.set('errorMessage', reason.error || reason);
      });
    },
    signUpTransition() {
      this.transitionToRoute('sign-up');
    }
  }
});
