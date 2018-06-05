import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'
 
export const Txns = new Mongo.Collection('txns');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('txns', function txnsPublication() {
      return Txns.find();
    });
}

Meteor.methods({

    'txns.insert'(item, price, category, date) {
      check(item, String);
      check(price, String)
      check(category, String)
      check(Date.parse(date), Number)
   
      if (! Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
   
      Txns.insert({
        item,
        price,
        category,
        date: Date.parse(date),
        owner: Meteor.userId()
      });
    },

    'txns.remove'(txnId) {
      check(txnId, String);

      Txns.remove(txnId);
    },

});