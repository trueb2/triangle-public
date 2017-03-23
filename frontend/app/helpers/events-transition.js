import Ember from 'ember';

export default function(context) {
  context.transitionToRoute('home').then(function() {
    Ember.run.scheduleOnce('afterRender', context, () => {
      Ember.$('body').animate({
        scrollTop: Ember.$('#events').offset().top
      }, 1500);
    });
  });
}
