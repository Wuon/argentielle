import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './floatingButton.html';

Template.floatingButton.events({

    'click .plus' : function(event){
        $('.plus').toggleClass('plus-active');
        $('.modal').toggleClass('modal-active');
        $('.floating-button').toggleClass('floating-button-active');
    }
    
});