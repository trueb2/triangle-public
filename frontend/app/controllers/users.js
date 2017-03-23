import Ember from 'ember';

export default Ember.Controller.extend({
  defaultFilter: false,
  role_name: Ember.computed('admin', function() {
    if(this.get('admin')) {
      console.log('Role is admin');
      return 'admin';
    } else {
      console.log('Role is registered');
      return 'registered';
    }
  }),
  filteredUsers: Ember.computed('model', 'filterBy', function() {
    return this.get('model').filterBy('approved', this.get('filterBy') || this.get('defaultFilter'));
  }),
  actions: {
    newSelectedUser(value) {
      this.set('selectedUser', value);
      this.set('email', this.get('selectedUser.email'));
      this.set('approved', this.get('selectedUser.approved'));
      this.set('admin', this.get('selectedUser.role_name') === 'admin');
    },
    userSubmitAction() {
      const selectedUser = this.get('selectedUser');
      if(Ember.isNone(selectedUser)) {
        var newUser = this.get('store').createRecord('user', {
          email: this.get('email'),
          approved: this.get('approved'),
          role_name: this.get('role_name')
        });
        newUser.save();
      } else {
        this.set('selectedUser.email', this.get('email'));
        this.set('selectedUser.approved', this.get('approved'));
        this.set('selectedUser.role_name', this.get('role_name'));
        this.get('selectedUser').save();
      }
      console.log('user submitted');
    }
  }
});
