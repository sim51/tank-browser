;(function (undefined) {
    'use strict';

    if (typeof tank === 'undefined')
        throw 'tank is not declared';

    // Create package
    sigma.utils.pkg('tank.classes.plugins.query');


    /**
     * The init function.
     *
     * @param {tank}    the related tank instance
     */
    tank.classes.plugins.query = function (tank) {

        // Init variables:
        var _self = this,
            _t = tank;

        this.id = _t.id + "-query";

        // Create the dom query container
        var domQueryContainer = document.createElement("div");
        domQueryContainer.setAttribute("id", this.id);
        document.getElementById(_t.id).appendChild(domQueryContainer);

        /**
         * Function that update the tank query with the textarea.
         */
        this.updateQuery = function () {
            console.log("[tank.plugins.query] => updateQuery");
            _t.query = document.getElementById(this.id + "-value").innerText;
        }

        /**
         * Function that the query (ie. tank.refresh()).
         */
        this.runQuery = function () {
            console.log("[tank.plugins.query] => runQuery");
            _t.refresh();
        }

        /**
         * Function that generate the render of this module.
         */
        this.render = function () {
            // templating
            // =======================
            var template = templates["tank.plugins.query"].render({ id:this.id, tank:_t});
            document.getElementById(this.id).innerHTML = template;

            // Adding the listeners
            // =======================
            // On the run button
            document.getElementById(this.id +"-run").addEventListener("click", this.runQuery, false);
            // When we change the query
            document.getElementById(this.id +"-value").addEventListener("change", this.updateQuery, false);
        }

        // Calling the refresh method
        _self.refresh(_t);
    };


    /**
     * The refresh function.
     */
    tank.classes.plugins.query.prototype.refresh = function() {
        this.render();
    };

}).call(this);