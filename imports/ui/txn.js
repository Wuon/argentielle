import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import './txn.html';
 
Template.txn.events({
  'click .delete'() {
    Meteor.call('txns.remove', this._id);
  },
});

Template.txn.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});