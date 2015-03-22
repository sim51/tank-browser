;(function (undefined) {
    'use strict';

    if (typeof tank === 'undefined')
        throw 'tank is not declared';

    // Create panel package
    sigma.utils.pkg('tank.classes.plugins.config');

    /**
     * The init function.
     *
     * @param {tank}    the related tank instance
     */
    tank.classes.plugins.config = function (tank) {

        // Init variables:
        var _self = this,
            _t = tank;

        _self.refresh();
    };

    /**
     * The refresh function.
     */
    tank.classes.plugins.config.prototype.refresh = function() {
        for(var key in tank.settings ) {
            if (document.getElementById(key)) {
                document.getElementById(key).value = tank.settings[key];
            }
        }
        this.eventListener();
    };

    /**
     * The eventListerner function.
     */
    tank.classes.plugins.config.prototype.eventListener = function(){
        var onclick = function() {
            for (var j = 0; j < document.getElementsByClassName('tank-settings').length; j++) {
                var name = document.getElementsByClassName('tank-settings')[j].getAttribute('id');
                var value = document.getElementsByClassName('tank-settings')[j].value;
                tank.instance().settings[name] = value;
            }
        };

        // when config value change, we reinit setting
        for (var j = 0; j < document.getElementsByClassName('tank-settings').length; j++) {
            document.getElementsByClassName('tank-settings')[j].onchange = onclick;
        }
    };


}).call(this);