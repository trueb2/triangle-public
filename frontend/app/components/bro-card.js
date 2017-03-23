import Ember from 'ember';
import Scrolling from '../mixins/scrolling';

export default Ember.Component.extend(Scrolling, {
  job_title: Ember.computed('job.execb', function() {
    switch(this.get('job.execb')) {
      case 0:
        return 'Brother';
      case 1:
        return 'President';
      case 2:
        return 'Vice President';
      case 3:
        return 'External Director';
      case 4:
        return 'Recruitment Director';
      case 5:
        return 'Social Director';
      case 6:
        return 'Treasurer';
      case 7:
        return 'House Manager';
      case 8:
        return 'Secretary';
    }
  }),
  fadeId: function() {
    return "js-fadeInElement"+this.get('bro.id');
  },
  didInsertElement() {
    this.bindScrolling();
    var element = document.getElementById(this.fadeId());
    Ember.$(element).addClass('js-fade-element-hide');
  },
  willRemoveElement() {
    this.unbindScrolling();
  },
  scrolled: function() {
    var element = document.getElementById(this.fadeId());

    if( Ember.$("#"+this.fadeId()).length > 0 ) {
      var elementTopToPageTop = Ember.$(element).offset().top;
      var windowTopToPageTop = Ember.$(window).scrollTop();
      var windowInnerHeight = window.innerHeight;
      var elementTopToWindowTop = elementTopToPageTop - windowTopToPageTop;
      var elementTopToWindowBottom = windowInnerHeight - elementTopToWindowTop;
      var distanceFromBottomToAppear = 300;

      if(elementTopToWindowBottom > distanceFromBottomToAppear) {
        Ember.$(element).addClass('js-fade-element-show');
      }
      else if(elementTopToWindowBottom < 0) {
        Ember.$(element).removeClass('js-fade-element-show');
        Ember.$(element).addClass('js-fade-element-hide');
      }
    }
  }
});
