import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './overview.html';

Template.overview.helpers({
    total() {
        var txns = Txns.find({ category : Meteor.userId() });
        console.log(txns);
        return 100;
    },
});