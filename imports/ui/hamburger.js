import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './hamburger.html';

Template.hamburger.events({

    'click .hamburger-shell': function (event) {
        $('#menu').slideToggle(300);
        $('.top').toggleClass('rotate');
        $('.middle').toggleClass('rotate-back');
        $('.menu-name').toggleClass('bump');
        $('.bg-cover').toggleClass('reveal');
    },

    'click #logoutWithGoogle': function() {
        Meteor.logout();
      },

    'click #monthly': function() {
        console.log("hello");
    },

    'click #yearly': function() {
        console.log("hello");
    },

});

Template.hamburger.helpers({
    name(){
      return Meteor.user().profile.name;
    }
});