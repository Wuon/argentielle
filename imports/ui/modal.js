import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './modal.html';

Template.modal.events({
    'submit .new-txn'(event) {
        event.preventDefault();

        const target = event.target;
        const item = target.item.value;
        const price = target.price.value;
        const category = target.category.value;
        const date = moment().toDate();

        Meteor.call('txns.insert', item, price, category, date);

        target.item.value = '';
        target.price.value = '';
        target.category.value = '';
        target.date.value = '';

        $('.plus').toggleClass('plus-active');
        $('.modal').toggleClass('modal-active');
        $('.floating-button').toggleClass('floating-button-active');
    },

    'click .date': function (event) {
        console.log(event.currentTarget.innerHTML);
    },

});

Template.modal.onRendered(function () {
    $(function () {
        function c() {
            p();
            var e = h();
            var r = 0;
            var u = false;
            l.empty();
            while (!u) {
                if (s[r] == e[0].weekday) {
                    u = true
                } else {
                    l.append('<div class="blank"></div>');
                    r++
                }
            }
            for (var c = 0; c < 42 - r; c++) {
                if (c >= e.length) {
                    l.append('<div class="blank"></div>')
                } else {
                    var v = e[c].day;
                    var m = g(new Date(t, n - 1, v)) ? '<div class="today date">' : '<div class="date">';
                    l.append(m + "" + v + "</div>")
                }
            }
            var y = o[n - 1];
            a.css("background-color", y)
                .find("h1")
                .text(i[n - 1] + " - " + t);
            f.find("div")
                .css("color", y);
            $(".date").hover(
                function() {
                    $(this).css("background-color", y );
                    $(this).css("color", "#ffffff" );
                }, 
                function() {
                    $( this ).css("background-color","");
                    $(this).css("color", "#787878" ); //to remove property set it to ''
                }
            );
            d()
        }

        function h() {
            var e = [];
            for (var r = 1; r < v(t, n) + 1; r++) {
                e.push({
                    day: r
                    , weekday: s[m(t, n, r)]
                })
            }
            return e
        }

        function p() {
            f.empty();
            for (var e = 0; e < 7; e++) {
                f.append("<div>" + s[e].substring(0, 3) + "</div>")
            }
        }

        function d() {
            var t;
            var n = $("#calendar")
                .css("width", e + "px");
            n.find(t = "#calendar_weekdays, #calendar_content")
                .css("width", e + "px")
                .find("div")
                .css({
                    width: e / 7 + "px"
                    , height: e / 7 + "px"
                    , "line-height": e / 7 + "px"
                });
            n.find("#calendar_header")
                .css({
                    height: e * (1 / 7) + "px"
                })
                .find('i[class^="fa-chevron"]')
                .css("line-height", e * (1 / 7) + "px")
        }

        function v(e, t) {
            return (new Date(e, t, 0))
                .getDate()
        }

        function m(e, t, n) {
            return (new Date(e, t - 1, n))
                .getDay()
        }

        function g(e) {
            return y(new Date) == y(e)
        }

        function y(e) {
            return e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate()
        }

        function b() {
            var e = new Date;
            t = e.getFullYear();
            n = e.getMonth() + 1
        }
        var e = 480;
        var t = 2013;
        var n = 9;
        var r = [];
        var i = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
        var s = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var o = ["#16a085", "#1abc9c", "#c0392b", "#27ae60", "#FF6860", "#f39c12", "#f1c40f", "#e67e22", "#2ecc71", "#e74c3c", "#d35400", "#2c3e50"];
        var u = $("#calendar");
        var a = u.find("#calendar_header");
        var f = u.find("#calendar_weekdays");
        var l = u.find("#calendar_content");
        b();
        c();
        a.find('.fa-chevron-right, .fa-chevron-left')
            .on("click", function () {
                var e = $(this);
                var r = function (e) {
                    n = e == "next" ? n + 1 : n - 1;
                    if (n < 1) {
                        n = 12;
                        t--
                    } else if (n > 12) {
                        n = 1;
                        t++
                    }
                    c()
                };
                if (e.attr("class")
                    .indexOf("left") != -1) {
                    r("previous")
                } else {
                    r("next")
                }
            })
    });
});