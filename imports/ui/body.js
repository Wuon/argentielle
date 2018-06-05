import { Template } from 'meteor/templating';
import { Txns } from '../api/txns.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import './txn.js';
import './body.html';

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
    // Otherwise, return all of the tasks
    return Txns.find({}, { sort: { date : -1}});
  },
  name(){
    return Meteor.user().profile.name;
  },
  total() {
    var total = 0;
    Txns.find({owner : Meteor.userId()}).forEach( function (txn) {
      total += parseInt(txn.price);
    });
    return total;
  }
  
});

Template.body.events({
  'submit .new-txn'(event) {
    event.preventDefault();
 
    const target = event.target;
    const item = target.item.value;
    const price = target.price.value;
    const category = target.category.value;
    const date = target.date.value;
 
    Meteor.call('txns.insert', item, price, category, date);
 
    target.item.value = '';
    target.price.value = '';
    target.category.value = '';
    target.date.value = '';
  },

  'change .show-food input'(event, instance) {
    instance.state.set('showFood', event.target.checked);
  },

  'click #loginWithGoogle': function() {
    Meteor.loginWithGoogle({ requestPermissions: ['email', 'profile'] });
  },
  'click #logoutWithGoogle': function() {
    Meteor.logout();
  },
});

