import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  approved: DS.attr('boolean'),
  role_name: DS.attr('string')
});
