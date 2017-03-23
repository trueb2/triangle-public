import Ember from 'ember';

export default Ember.Mixin.create({
  bindScrolling: function() {
    var _this = this;
    var onScroll = function() {
      _this.scrolled();
    };
    Ember.$(document).bind('touchmove', onScroll);
    Ember.$(window).bind('scroll', onScroll);
  },
  unbindScrolling: function() {
    Ember.$(document).unbind('touchmove');
    Ember.$(window).unbind('scroll');
  }
});
