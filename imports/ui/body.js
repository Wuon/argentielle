import { Template } from 'meteor/templating';
import { Txns } from '../api/txns.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import './txn.js';
import './body.html';
import './floatingButton.js';
import './modal.js';
import './hamburger.js';

var txnMonth = [];

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('month', moment().format('MMMM'));
  this.state.set('year', moment().format('YYYY'));
  Meteor.subscribe('txns');
  var fetch = Txns.find({}, { sort: { date : -1}});
  fetch.forEach((txn) => {
    if("July2018"== moment.utc(txn.date).format("MMMMYYYY")){
      txnMonth.push(txn);
    }
  });
});
 
Template.body.helpers({

  txns() {
    const instance = Template.instance();

    txnMonth = [];

    if (instance.state.get('showFood')) {
      return Txns.find({ category : "food" }, { sort: { date: -1 } });
    }

    var fetch = Txns.find({}, { sort: { date : -1}});

    fetch.forEach((txn) => {
      if(instance.state.get('month') + instance.state.get('year')== moment.utc(txn.date).format("MMMMYYYY")){
        txnMonth.push(txn);
      }
    });

    return txnMonth;
  },

  name(){
    return Meteor.user().profile.name;
  },

  total(){
    const instance = Template.instance();
    var total = 0;
    var fetch = Txns.find({}, { sort: { date : -1}});

    fetch.forEach((txn) => {
      if(instance.state.get('month') + instance.state.get('year')== moment.utc(txn.date).format("MMMMYYYY")){
        total += parseInt(txn.price);
      }
    });
    return total;
  },

  curMonth(){
    const instance = Template.instance();
    return instance.state.get('month')
  },

  curYear(){
    const instance = Template.instance();
    return instance.state.get('year')
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
  },

  'click .next' : function(event, instance){
    instance.state.set('month', moment(moment(instance.state.get('month'), 'MMM').toDate()).add(1, 'month').format('MMMM'));
  },

  'click .prev' : function(event, instance){
    instance.state.set('month', moment(moment(instance.state.get('month'), 'MMM').toDate()).add(-1, 'month').format('MMMM'));
  }
});