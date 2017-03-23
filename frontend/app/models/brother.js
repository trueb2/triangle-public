import DS from 'ember-data';

export default DS.Model.extend({
  first: DS.attr('string'),
  middle: DS.attr('string'),
  last: DS.attr('string'),
  major: DS.attr('string'),
  pledge_class: DS.attr('string'),
  city: DS.attr('string'),
  state: DS.attr('string'),
  phone: DS.attr('string'),
  email: DS.attr('string'),

  semesters: DS.hasMany('semester', {async: true}),
  jobs: DS.hasMany('job', {async: true}),
  image: DS.belongsTo('image', {async: true})
});
