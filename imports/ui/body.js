import { Template } from 'meteor/templating';
import { Txns } from '../api/txns.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import './txn.js';
import './body.html';
import './floatingButton.js';
import './modal.js';
import './hamburger.js';

var txnMonth = [];
var total = 0;

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('month', moment().format('MMMM'));
  this.state.set('year', moment().format('YYYY'));
  this.state.set('range', true);
  this.state.set('isZero', false);
  Meteor.subscribe('txns');
});
 
Template.body.helpers({

  txns() {
    const instance = Template.instance();

    txnMonth = [];

    if (instance.state.get('showFood')) {
      return Txns.find({ category : "food" }, { sort: { date: -1 } });
    }

    var fetch = Txns.find({}, { sort: { date : -1}});

    if(instance.state.get('range')){
      fetch.forEach((txn) => {
        if(instance.state.get('month') + instance.state.get('year')== moment.utc(txn.date).format("MMMMYYYY")){
          txnMonth.push(txn);
        }
      });
    }else{
      fetch.forEach((txn) => {
        if(instance.state.get('year')== moment.utc(txn.date).format("YYYY")){
          txnMonth.push(txn);
        }
      });
    }

    return txnMonth;
  },

  name(){
    return Meteor.user().profile.name;
  },

  total(){
    const instance = Template.instance();
    total = 0;
    var fetch = Txns.find({}, { sort: { date : -1}});

    if(instance.state.get('range')){
      fetch.forEach((txn) => {
        if(instance.state.get('month') + instance.state.get('year')== moment.utc(txn.date).format("MMMMYYYY")){
          total += parseFloat(txn.price);
        }
      });
    }else{
      fetch.forEach((txn) => {
        if(instance.state.get('year')== moment.utc(txn.date).format("YYYY")){
          total += parseFloat(txn.price);
        }
      });
    }

    if(total == 0){
      instance.state.set('isZero', true) 
    }else{
      instance.state.set('isZero', false) 
    }

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

  getRange(){
    const instance = Template.instance();
    return instance.state.get('range')
  },

  isZero(){
    const instance = Template.instance();
    return instance.state.get('isZero')
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
    if(instance.state.get('range')){
      newMonth = moment(moment(instance.state.get('month'), 'MMM').toDate()).add(1, 'month').format('MMMM');
      if(newMonth == "January"){
        instance.state.set('year', moment(moment(instance.state.get('year'), 'YYYY').toDate()).add(1, 'year').format('YYYY'));
      }
      instance.state.set('month', newMonth);
    }else{
      instance.state.set('year', moment(moment(instance.state.get('year'), 'YYYY').toDate()).add(1, 'year').format('YYYY'));
    }
   },

  'click .prev' : function(event, instance){
    if(instance.state.get('range')){
      newMonth = moment(moment(instance.state.get('month'), 'MMM').toDate()).add(-1, 'month').format('MMMM');
      if(newMonth == "December"){
        instance.state.set('year', moment(moment(instance.state.get('year'), 'YYYY').toDate()).add(-1, 'year').format('YYYY'));
      }
      instance.state.set('month', newMonth);
    }else{
      instance.state.set('year', moment(moment(instance.state.get('year'), 'YYYY').toDate()).add(-1, 'year').format('YYYY'));
    }
  },

  'click #monthly': function(event, instance) {
    instance.state.set('range', true);
  },

  'click #yearly': function(event, instance) {
    instance.state.set('range', false);
  },
});