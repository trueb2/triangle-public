import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  brothers: DS.hasMany('brother', {async: true}),
  events: DS.hasMany('event', {async: true}),
  jobs: DS.hasMany('job', {async: true})
});
