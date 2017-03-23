import Ember from 'ember';
import Scrolling from '../mixins/scrolling';

export default Ember.Component.extend(Scrolling, {
  backgroundImage: Ember.computed('image', function() {
    return Ember.String.htmlSafe("background: url('" + this.get('image') + "');");
  }),
  didInsertElement() {
    this.bindScrolling();
  },
  willRemoveElement() {
    this.unbindScrolling();
  },
  scrolled: function() {
    var parallax_window = Ember.$("#js-parallax-window"+this.get('windowId'));
    if (parallax_window.length && parallax_window.length > 0) {
      var plxBackground = Ember.$("#js-parallax-background"+this.get('windowId'));
      var plxWindow = Ember.$("#js-parallax-window"+this.get('windowId'));

      var plxWindowTopToPageTop = Ember.$(plxWindow).offset().top;
      var windowTopToPageTop = Ember.$(window).scrollTop();
      var plxWindowTopToWindowTop = plxWindowTopToPageTop - windowTopToPageTop;

      // var plxBackgroundTopToPageTop = Ember.$(plxBackground).offset().top;
      // var windowInnerHeight = window.innerHeight;
      // var plxBackgroundTopToWindowTop = plxBackgroundTopToPageTop - windowTopToPageTop;
      // var plxBackgroundTopToWindowBottom = windowInnerHeight - plxBackgroundTopToWindowTop;

      var plxSpeed = 0.35;

      plxBackground.css('top', - (plxWindowTopToWindowTop * plxSpeed) + 'px');
    }
  }
});
