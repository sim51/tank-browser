;(function (undefined) {
    'use strict';

    /**
     * Handler bar helper for timeago.
     */
    Handlebars.registerHelper("timeAgo", function(date) {
        return tank.utils.timeago(date);
    });

    /**
     * Handler bar helper for randomcolor.
     */
    Handlebars.registerHelper("randomcolor", function() {
        return tank.utils.randomcolor();
    });

    /**
     * Handler bar helper for select
     */
    Handlebars.registerHelper("selected", function(option, value){
        if (option === value) {
            return ' selected';
        } else {
            return ''
        }
    });

}).call(this);