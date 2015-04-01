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

        this.id = _t.id + "-config";

        // Create the dom query container if it not exist
        if(!document.getElementById(this.id)) {
            var domQueryContainer = document.createElement("div");
            domQueryContainer.setAttribute("id", this.id);
            document.getElementById(_t.id).appendChild(domQueryContainer);
        }

        /**
         * Event : on change a field.
         */
        this.eventChangeConfig = function () {
            console.log("[tank.plugins.config] => eventChangeConfig");
            // update config param
            var param = this.getAttribute("id").replace(_self.id + "-", "");
            var value = this.value;
            if( value === 'true' || value === 'false') {
                eval("_t.settings." + param + " = " + value + "");
            }
            else {
                eval("_t.settings." + param + " = '" + value + "'");
            }
            _t.refresh();
        };

        /**
         * Function that generate the render of this module.
         */
        this.render = function () {
            // templating
            // =======================
            var template = templates.tank.plugins.config.panel({ id:this.id, tank:_t});
            document.getElementById(this.id).innerHTML = template;

            // Adding the listeners
            // =======================
            // When we change the value of a param
            for (var j = 0; j < document.getElementsByClassName(this.id + "-field").length; j++) {
                document.getElementsByClassName(this.id + "-field")[j].addEventListener("change", this.eventChangeConfig, false);
            }
        };

        _self.refresh();
    };

    /**
     * The refresh function.
     */
    tank.classes.plugins.config.prototype.refresh = function() {
        this.render();
    };

}).call(this);