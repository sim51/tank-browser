;(function (undefined) {
    'use strict';

    /**
     * Handler bar helper for timeago.
     */
    Handlebars.registerHelper("timeAgo", function (date) {
        return tank.utils.timeago(date);
    });

    /**
     * Handler bar helper for randomcolor.
     */
    Handlebars.registerHelper("randomcolor", function () {
        return tank.utils.randomcolor();
    });

    /**
     * Handler bar helper for select
     */
    Handlebars.registerHelper("selected", function (option, value) {
        if (option === value) {
            return ' selected';
        } else {
            return '';
        }
    });

    /**
     * Handler bar helper to retrieve the first letter of a word
     */
    Handlebars.registerHelper("firstLetter", function (value) {
        return value.charAt(0);
    });

    /**
     * Handler bar helper for select
     */
    Handlebars.registerHelper("circleStyle", function (color, radian, coef) {
        var realRadian = Number.parseFloat(radian) + Number.parseFloat(coef) * 5;
        var style = "";
        style += "background-color:" + color + ";";
        style += "width:" + realRadian + "px; height:" + realRadian + "px;";
        style += "line-height:" + realRadian + "px;";
        return style;
    });

}).call(this);