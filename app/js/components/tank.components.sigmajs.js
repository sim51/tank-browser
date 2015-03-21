;(function (undefined) {
    'use strict';

    if (typeof tank === 'undefined')
        throw 'tank is not declared';

    // Create panel package
    sigma.utils.pkg('tank.components.classes.sigmajs');

    // init sigmajs
    tank.components.classes.sigmajs = function() {

        // new instance of sigma
        var s = new sigma({
            renderer: {
                container: document.getElementById('graph-container'),
                type: 'canvas'
            }
        });

        return s;
    };

}).call(this);