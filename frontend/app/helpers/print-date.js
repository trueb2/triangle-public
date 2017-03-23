import Ember from 'ember';

export function printDate(params/*, hash*/) {
  const d = params[0];
  var minutes = d.getMinutes().toString().length === 1 ? '0'+d.getMinutes() : d.getMinutes();
  var hours = d.getHours().toString().length === 1 ? '0'+d.getHours() : d.getHours();
  var ampm = d.getHours() >= 12 ? 'pm' : 'am';
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  return days[d.getDay()]+' '+months[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear()+' '+hours%12+':'+minutes+ampm;
}

export default Ember.Helper.helper(printDate);
