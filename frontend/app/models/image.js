import DS from 'ember-data';

export default DS.Model.extend({
  path: DS.attr('string'),
  image_purpose: DS.attr('number'),
  brother: DS.belongsTo('brother'),
  event: DS.belongsTo('event')
});
