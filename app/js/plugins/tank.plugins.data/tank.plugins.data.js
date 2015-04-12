;(function (undefined) {
    'use strict';

    if (typeof tank === 'undefined')
        throw 'tank is not declared';

    // Create panel package
    sigma.utils.pkg('tank.classes.plugins.data');


    /**
     * The init function.
     */
    tank.classes.plugins.data = function (tank) {

        // Init variables:
        var _self = this,
            _t = tank;

        this.id = _t.id + "-data";

        // Create the dom data container if it not exist
        if(!document.getElementById(this.id)) {
            var domContainer = document.createElement("div");
            domContainer.setAttribute("id", this.id);
            domContainer.setAttribute("class", "tank-container-data");
            document.getElementById(_t.id).appendChild(domContainer);
        }

        /**
         * Function that hidden the data panel.
         */
        this.hidePanel = function () {
            document.getElementById(_self.id).style.display = 'none';
        };

        /**
         *
         */
        this.displayNodePanel = function (node) {
            var template = templates.tank.plugins.data.node({ id: _self.id, tank: _t, node: node});
            document.getElementById(_self.id).innerHTML = template;
            document.getElementById(_self.id).style.display = 'block';
        };

        /**
         *
         */
        this.displayEdgePanel = function (edge) {
            var template = templates.tank.plugins.data.edge({ id: _self.id, tank: _t, edge: edge});
            document.getElementById(_self.id).innerHTML = template;
            document.getElementById(_self.id).style.display = 'block';
        };

        /**
         * Register sigmajs bind event.
         */
        this.registerSigmaBind = function () {

            // Bind display node data
            tank.sigmajs.bind("overNode", function (e) {
                _self.displayNodePanel(e.data.node);
            });

            // Bind display edge data
            tank.sigmajs.bind("overEdge", function (e) {
                _self.displayEdgePanel(e.data.edge);
            });

            // Bind hidden node data
            tank.sigmajs.bind("outNode outEdge", function (e) {
                _self.hidePanel();
            });

        };

    };


    /**
     * The refresh function.
     */
    tank.classes.plugins.data.prototype.refresh = function () {
        this.registerSigmaBind();
    };

}).call(this);
