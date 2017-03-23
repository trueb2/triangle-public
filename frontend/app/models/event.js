import DS from 'ember-data';

export default DS.Model.extend({
  start: DS.attr('date'),
  short: DS.attr('string'),
  long: DS.attr('string'),
  event_type: DS.attr('number'),
  semester: DS.hasMany('semester', {async: true}),
  image: DS.belongsTo('image', {async: true})
});
