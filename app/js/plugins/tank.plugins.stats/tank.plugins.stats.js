;(function (undefined) {
    'use strict';

    if (typeof tank === 'undefined')
        throw 'tank is not declared';

    // Create panel package
    sigma.utils.pkg('tank.classes.plugins.stats');

    /**
     * The init function.
     */
    tank.classes.plugins.stats = function (t) {
        // Init variables:
        var _self = this,
            _t = t;

        this.id = _t.id + "-stats";

        this.jscolor = jscolor;
        jscolor.dir = './lib/jscolor/';

        // init object by calling refresh method
        var _self = this;

        // Create the dom query container if it not exist
        if(!document.getElementById(this.id)) {
            var domQueryContainer = document.createElement("div");
            domQueryContainer.setAttribute("id", this.id);
            document.getElementById(_t.id).appendChild(domQueryContainer);
        }

        /**
         * Event : change color for type.
         */
        this.eventOnChangeColorType = function () {
            console.log("[tank.plugins.stats] => color type");
            var id = this.getAttribute("data-id");
            _t.types[id].color = '#' + this.value;
        };

        /**
         * Event : change color for label.
         */
        this.eventOnChangeColorLabel = function () {
            console.log("[tank.plugins.stats] => color label");
            var id = this.getAttribute("data-id");
            _t.labels[id].color = '#' + this.value;
        };

        /**
         * Function that generate the render of this module.
         */
        this.render = function () {
            var i, j, nodes, node, edges, edge, label;

            // templating
            // =======================
            var template;
            if(_t.sigmajs.graph) {

                //FIXME: redo with underscore

                // Refresh label & type on tank instance from sigmajs graph
                // =======================
                // update types
                edges = _t.sigmajs.graph.edges();
                for (i in edges) {
                    edge = edges[i];
                    if (!_t.findTypeByName(edge.type)) {
                        // adding the current type to the list
                        _t.types.push({
                            name: edge.type,
                            color: tank.utils.randomcolor(),
                            count : 1
                        });
                    }
                    else {
                        _t.findTypeByName(edge.type).count += 1;
                    }
                }
                // update labels
                nodes = _t.sigmajs.graph.nodes();
                for (i in nodes) {
                    node = nodes[i];
                    for (j in node.labels) {
                        label = node.labels[j];
                        if (!_t.findLabelByName(label)) {
                            // adding the current label to the list
                            _t.labels.push({
                                name: label,
                                color: [tank.utils.randomcolor()],
                                count : 1
                            });
                        }
                        else {
                            _t.findLabelByName(label).count += 1;
                        }
                    }
                }
                template = templates.tank.plugins.stats.panel({ id:this.id, tank:_t, node_count:_t.sigmajs.graph.nodes().length, edge_count:_t.sigmajs.graph.edges().length });
            } else {
                template = templates.tank.plugins.stats.panel({ id:this.id, tank:_t, node_count:0, edge_count:0});
            }
            document.getElementById(this.id).innerHTML = template;

            // Adding the listeners
            // =======================
            // On chnage color on types
            for (j = 0; j < document.getElementsByClassName('color labels').length; j++) {
                document.getElementsByClassName('color labels')[j].addEventListener("change", this.eventOnChangeColorLabel, false);
            }
            // On chnage color on labels
            for (j = 0; j < document.getElementsByClassName('color types').length; j++) {
                document.getElementsByClassName('color types')[j].addEventListener("change", this.eventOnChangeColorType, false);
            }

            this.jscolor.init();
        };

        // Calling the refresh method
        _self.refresh();

    };

    /**
     * The refresh function.
     */
    tank.classes.plugins.stats.prototype.refresh = function () {
        this.render();
    };

}).call(this);