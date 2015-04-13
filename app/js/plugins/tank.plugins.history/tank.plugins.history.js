;(function (undefined) {
    'use strict';

    if (typeof tank === 'undefined')
        throw 'tank is not declared';

    // Create panel package
    sigma.utils.pkg('tank.classes.plugins.history');

    // init the history list on tank prototype;
    tank.prototype.history = [];

    /**
     * The init function.
     */
    tank.classes.plugins.history = function (tank) {

        // Init variables:
        var _self = this,
            _t = tank;

        this.id = _t.id + "-history";

        // Create the dom query container if it not exist
        if(!document.getElementById(this.id)) {
            var domContainer = document.createElement("div");
            domContainer.setAttribute("id", this.id);
            document.getElementById(_t.id).appendChild(domContainer);
        }

        /**
         * Event : run the history query
         */
        this.eventRunHistory = function () {
            console.log("[tank.plugins.history] => eventRunHistory");
            var itemId = this.getAttribute("data-id");
            _t.query = _t.history[itemId];
            _t.refresh();
        };

        /**
         * Function that save the current query into history.
         */
        this.saveIntoHistory = function () {
            console.log("[tank.plugins.history] => saveIntoHistory");
            _t.history.push({
                query: _t.query.query,
                title: _t.query.title,
                date: new Date()
            });
        };

        /**
         * Function that generate the render of this module.
         */
        this.render = function () {

            // templating
            // =======================
            var template = templates.tank.plugins.history.panel({ id: this.id, tank: _t});
            document.getElementById(this.id).innerHTML = template;

            // Adding the listeners
            // =======================
            // On link to run query
            for (var j = 0; j < document.getElementsByClassName(this.id + "-link").length; j++) {
                document.getElementsByClassName(this.id + "-link")[j].addEventListener("click", this.eventRunHistory, false);
            }
        };

        _self.render();
    };


    /**
     * The refresh function.
     */
    tank.classes.plugins.history.prototype.refresh = function () {
        this.saveIntoHistory();
        this.render();
    };

}).call(this);
