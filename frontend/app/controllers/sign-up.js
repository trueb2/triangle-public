import Ember from 'ember';
import config from 'frontend/config/environment';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  actions: {
    registerAction() {
      var _this = this;
      let { email, password, confirmPassword } = _this.getProperties('email', 'password', 'confirmPassword');
      if(password === confirmPassword) {
        Ember.$.ajax({
          type: 'POST',
          url: config.host + '/api/devise',
          data: {user: {email: email, password: password}}
        }).then(function() {
          Ember.$('#hello').addClass('hide');
          Ember.$('#goodbye').removeClass('hide');
        });
      } else {
        console.log('passwords do not match');
      }
    }
  }
});
