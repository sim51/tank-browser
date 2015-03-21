;(function (undefined) {
    'use strict';

    if (typeof tank === 'undefined')
        throw 'tank is not declared';

    // Create utils package
    sigma.utils.pkg('tank.utils');

    /**
     * Function that generate a text "X ago" from now.
     *
     * @param {Date}    timestamp   A date in the pass.
     * @returns {String}
     */
    tank.utils.timeago = function (timestamp) {

        var settings = {
            seconds: "less than a minute",
            minute: "about a minute",
            minutes: "%d minutes",
            hour: "about an hour",
            hours: "about %d hours",
            day: "a day",
            days: "%d days",
            month: "about a month",
            months: "%d months",
            year: "about a year",
            years: "%d years",
            wordSeparator: " "
        };

        if (timestamp instanceof Date) {
            var distance = new Date() - timestamp;
            var seconds = Math.abs(distance) / 1000;
            var minutes = seconds / 60;
            var hours = minutes / 60;
            var days = hours / 24;
            var years = days / 365;

            var words = seconds < 45 && settings.seconds.replace('/%d/i', Math.round(seconds)) ||
                seconds < 90 && settings.minute.replace('/%d/i', 1) ||
                minutes < 45 && settings.minutes.replace('/%d/i', Math.round(minutes)) ||
                minutes < 90 && settings.hour.replace('/%d/i', 1) ||
                hours < 24 && settings.hours.replace('/%d/i', Math.round(hours)) ||
                hours < 42 && settings.day.replace('/%d/i', 1) ||
                days < 30 && settings.days.replace('/%d/i', Math.round(days)) ||
                days < 45 && settings.month.replace('/%d/i', 1) ||
                days < 365 && settings.months.replace('/%d/i', Math.round(days / 30)) ||
                years < 1.5 && settings.year.replace('/%d/i', 1) ||
                settings.years.replace('/%d/i', Math.round(years));

            return words;
        } else {
            return timestamp;
        }
    };

}).call(this);