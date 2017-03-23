import Ember from 'ember';
import Scrolling from '../mixins/scrolling';

export default Ember.Component.extend(Scrolling, {
  // backgroundImage: Ember.computed('image', function() {
  //   return Ember.String.htmlSafe("background-image: url("+this.get('image')+"); background-repeat: no-repeat;");
  // }),
  slideId: function() {
    return 'js-slideInElement'+this.get('fadeId');
  },
  url: Ember.computed('event_type', function() {
    var event_type = parseInt(this.get('event_type'));
    if(event_type === 0) {
      return '/assets/images/rush2.png';
    } else if (event_type === 1) {
      return '/assets/images/service.png';
    } else if( event_type === 2) {
      return '/assets/images/careers.png';
    }
  }),
  didInsertElement() {
    this.bindScrolling();
  },
  willRemoveElement() {
    this.unbindScrolling();
  },
  scrolled: function() {
    var element = document.getElementById(this.slideId());
    if(Ember.$('#'+this.slideId()).length > 0) {
      var elementTopToPageTop = Ember.$(element).offset().top;
      var windowTopToPageTop = Ember.$(window).scrollTop();
      var windowInnerHeight = window.innerHeight;
      var elementTopToWindowTop = elementTopToPageTop - windowTopToPageTop;
      var elementTopToWindowBottom = windowInnerHeight - elementTopToWindowTop;
      var distanceFromBottomToAppear = 200;

      if(elementTopToWindowBottom > distanceFromBottomToAppear) {
        Ember.$(element).addClass('js-slide-left-show');
      }
      else if(elementTopToWindowBottom < 0) {
        Ember.$(element).removeClass('js-slide-left-show');
        Ember.$(element).addClass('js-slide-left-hide');
      }
    }

  }
});
