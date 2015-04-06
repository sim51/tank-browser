;(function (undefined) {
    'use strict';

    if (typeof tank === 'undefined')
        throw 'tank is not declared';

    // Create panel package
    sigma.utils.pkg('tank.classes.plugins.sigma_dragnode');

    /**
     * The init function.
     */
    tank.classes.plugins.sigma_dragnode = function (tank) {

        // Init variables:
        var _self = this,
            _t = tank;

        /**
         * Function that generate the render of this module.
         */
        this.render = function () {
            sigma.plugins.dragNodes(_t.sigmajs, _t.sigmajs.renderers[0]);
        };

        _self.render();
    };


    /**
     * The refresh function.
     */
    tank.classes.plugins.sigma_dragnode.prototype.refresh = function () {
        this.render();
    };

}).call(this);
