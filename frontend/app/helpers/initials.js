import Ember from 'ember';

export function initials(params/*, hash*/) {
  let brother = params[0];
  if(Ember.isNone(brother) || Ember.isNone(brother.content)) {
    return "";
  } else {
    let a = brother.get("first").charAt(0);
    let b = brother.get("middle").charAt(0);
    let c = brother.get("last").charAt(0);
    let initials = (a + b + c);
    return initials.capitalize();
  }
}

export default Ember.Helper.helper(initials);
