import Ember from 'ember';
import eventsTransition from '../helpers/events-transition';

export default Ember.Controller.extend({
  startDate: Ember.computed('start', function() {
    return new Date(Date.parse(this.get('start')));
  }),
  eventImages: Ember.computed(function() {
    return this.get('store').peekAll('image');
  }),
  filteredEventImages: Ember.computed('eventImages', 'selectedEvent', function() {
    const selectedEvent = this.get('selectedEvent');
    return this.get('eventImages').filter(function(image) {
      const unusedImage = image.get('brother.id') === undefined &&
                          image.get('event.id') === undefined;
      const sameImage = selectedEvent && image.id === selectedEvent.get('image.id');
        return sameImage || unusedImage;
    });
  }),
  actions: {
    newSelectedEvent(value) {
      this.set('selectedEvent', value);
      this.set('short', this.get('selectedEvent.short'));
      this.set('long', this.get('selectedEvent.long'));
      this.set('start', this.get('selectedEvent.start'));
      this.set('event_type', this.get('selectedEvent.event_type'));
      this.set('selectedImage', this.get('selectedEvent.image'));
    },
    eventSubmitAction() {
      // use startDate to parse the start parameter
      const selectedEvent = this.get('selectedEvent');
      if(Ember.isNone(selectedEvent)) {
        var new_event = this.get('store').createRecord('event', {
          start: this.get('startDate'),
          short: this.get('short'),
          long: this.get('long'),
          event_type: this.get('event_type'),
          image: this.get('selectedImage')
        });

        new_event.save();
      } else {
        const editedEventId = this.get('selectedEvent.id');
        const _this = this;
        this.get('store').findRecord('event', editedEventId).then(function(edited) {
          edited.set('short', _this.get('short'));
          edited.set('long', _this.get('long'));
          edited.set('start', _this.get('startDate'));
          edited.set('event_type', _this.get('event_type'));
          edited.set('image', _this.get('selectedImage'));
          edited.save();
        });
      }
      eventsTransition(this);
    }
  }
});
