import { Template } from 'meteor/templating';
import { Txns } from '../api/txns.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import './txn.js';
import './body.html';
import './floatingButton.js';
import './modal.js';
import './hamburger.js';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('txns');
});
 
Template.body.helpers({

  txns() {
    const instance = Template.instance();
    if (instance.state.get('showFood')) {
      // If hide completed is checked, filter tasks
      return Txns.find({ category : "food" }, { sort: { date: -1 } });
    }

    var fetch = Txns.find({}, { sort: { date : -1}});
    var txnMonth = []

    fetch.forEach((txn) => {
      if(moment().format('MMMMYYYY') == moment.utc(txn.date).format("MMMMYYYY")){
        txnMonth.push(txn);
      }
    });
    // Otherwise, return all of the tasks
    return txnMonth;
  },

  name(){
    return Meteor.user().profile.name;
  },

  total(){
    var total = 0;
    Txns.find({owner : Meteor.userId()}).forEach( function (txn) {
      total += parseInt(txn.price);
    });
    return total;
  },

  curMonth(){
    return moment().format('MMMMYYYY');
  },

  month(){
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    return months;
  }

});

Template.body.events({
  'change .show-food input'(event, instance) {
    instance.state.set('showFood', event.target.checked);
  },

  'click #loginWithGoogle': function() {
    Meteor.loginWithGoogle({ requestPermissions: ['email', 'profile'] });
  }
});