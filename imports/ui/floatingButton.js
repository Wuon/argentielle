import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './floatingButton.html';

Template.floatingButton.events({

    'click .plus' : function(event){
        $('.plus').toggleClass('plus-active');
        $('.modal').toggleClass('modal-active');
        $('.floating-button-calendar').toggleClass('active');
        $('.floating-button-next').toggleClass('inactive');
        $('.floating-button-prev').toggleClass('inactive');
        $('.floating-button').toggleClass('floating-button-active');
        
    },

    'click .calendar' : function(event){
        $('.modal-content').toggleClass('inactive');
        $('.test').toggleClass('active');
    },
});