import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  email: DS.attr('string'),
  execb: DS.attr('number'),
  semester: DS.belongsTo('semester'),
  brother: DS.belongsTo('brother', {async: true})
});
