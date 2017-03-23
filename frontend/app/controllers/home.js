import Ember from 'ember';

export default Ember.Controller.extend({
  execSorting: ['execb'],
  eventSorting: ['start'],
  showPastEvents: true,
  execBoard: Ember.computed.sort('model.jobs', 'execSorting'),
  sortedEvents: Ember.computed.sort('model.events', 'eventSorting'),
  upcomingEvents: Ember.computed('sortedEvents', function() {
    return this.get('sortedEvents').filter(function(e) {
      const cutOff = new Date();
      cutOff.setHours(cutOff.getHours() + 1);
      return e.get('start') > cutOff;
    });
  }),
  pastEvents: Ember.computed('sortedEvents', function() {
    return this.get('sortedEvents').filter(function(e) {
      const cutOff = new Date();
      cutOff.setHours(cutOff.getHours() + 1);
      return e.get('start') < cutOff;
    });
  }),
  displayEvents: Ember.computed('upcomingEvents', 'pastEvents', 'showPastEvents', function() {
    if (this.get('showPastEvents')) {
      const past = this.get('pastEvents').slice();
      past.reverse();
      return past;
    } else {
      const future = this.get('upcomingEvents');
      if(future.length === 0 && this.get('showPastEvents')) {
        return this.get('pastEvents').reverse();
      } else {
        return future;
      }
    }
  }),
  actions: {
    toggleShowPastEvents() {
      this.set('showPastEvents', !this.get('showPastEvents'));
    }
  }
});
