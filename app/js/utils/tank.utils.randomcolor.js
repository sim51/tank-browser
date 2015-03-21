;(function (undefined) {
    'use strict';

    if (typeof tank === 'undefined')
        throw 'tank is not declared';

    // Create utils package
    sigma.utils.pkg('tank.utils');

    /**
     * Function that generate a random color
     *
     * @returns {String}
     */
    tank.utils.randomcolor = function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

}).call(this);