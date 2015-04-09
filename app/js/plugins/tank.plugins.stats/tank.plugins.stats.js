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
        jscolor.dir = './assets/jscolor/';
        jscolor.getElementPos = function (e) {
            var e1 = e, e2 = e;
            var x = 0, y = 0;
            if (e1.offsetParent) {
                do {
                    x += e1.offsetParent.offsetLeft + 85;
                    y += e1.offsetParent.offsetTop + 64;
                } while (e1 == e1.offsetParent);
            }
            return [x, y];
        };

        // Create the dom query container if it not exist
        if (!document.getElementById(this.id)) {
            var domQueryContainer = document.createElement("div");
            domQueryContainer.setAttribute("id", this.id);
            document.getElementById(_t.id).appendChild(domQueryContainer);
        }

        /**
         * Redraw the sigmajs graph & plugin.
         */
        this.redraw = function () {
            _t.updateGraphNode();
            _t.updateGraphEdge();
            _t.sigmajs.refresh();
            this.render();
        };

        /**
         * Event : when display form to change edge/node attributes
         */
        this.eventToggleModifyForm = function () {
            var id = this.getAttribute("data-id");
            var type = this.getAttribute("data-type");
            var form = this.nextElementSibling;
            var display = false;

            if (form.style.display == "block") {
                form.style.display = 'none';
            } else {
                form.style.display = 'block';
                display = true;
            }

            eval("_t." + type + "[" + id + "].open = " + display);
        };

        /**
         * Event : change color.
         */
        this.eventOnChangeColor = function () {
            var id = this.getAttribute("data-id");
            var type = this.getAttribute("data-type");

            if( type === "types") {
                _t.types[id].color = '#' + this.value;
            }
            else {
                _t.labels[id].color = '#' + this.value;
            }


            // Redraw
            _self.redraw();
        };

        /**
         * Event : change size.
         */
        this.eventOnChangeSize = function () {
            var id = this.getAttribute("data-id");
            var type = this.getAttribute("data-type");

            if( type === "types") {
                _t.types[id].size = this.value;
            }
            else {
                _t.labels[id].size = this.value;
            }

            // Redraw
            _self.redraw();
        };

        /**
         * Event : change shape.
         */
        this.eventOnChangeShape = function () {
            var id = this.getAttribute("data-id");
            var type = this.getAttribute("data-type");

            if( type === "types") {
                _t.types[id].shape = this.value;
            }

            // Redraw
            _self.redraw();
        };

        /**
         * Calculate initialize labels & types array from the sigma graph data.
         */
        this.calculateLabelEdgeFromSigma = function () {
            var i, j, nodes, node, edges, edge, label;

            // step 1 : reinitialize counter
            _.each(_t.types, function (type) { type.count = 0; });
            _.each(_t.labels, function (label) { label.count = 0; });

            // Refresh label & type on tank instance from sigmajs graph
            // =======================
            // update types
            edges = _t.sigmajs.graph.edges();
            for (i in edges) {
                edge = edges[i];
                if (!_t.findTypeByName(edge.neo4j_type)) {
                    // adding the current type to the list
                    _t.types.push({
                        name: edge.neo4j_type,
                        color: tank.utils.randomcolor(),
                        size: tank.settings.default_edge_size,
                        shape: tank.settings.default_edge_shape,
                        count: 1
                    });
                }
                else {
                    _t.findTypeByName(edge.neo4j_type).count += 1;
                }
            }
            // update labels
            nodes = _t.sigmajs.graph.nodes();
            for (i in nodes) {
                node = nodes[i];
                for (j in node.neo4j_labels) {
                    label = node.neo4j_labels[j];
                    if (!_t.findLabelByName(label)) {
                        // adding the current label to the list
                        _t.labels.push({
                            name: label,
                            color: tank.utils.randomcolor(),
                            size: tank.settings.default_node_size,
                            count: 1
                        });
                    }
                    else {
                        _t.findLabelByName(label).count += 1;
                    }
                }
                _t.sigmajs.graph.nodes()[i] = node;
            }
        };

        /**
         * Function that generate the render of this module.
         */
        this.render = function () {
            var j;

            _t.updateGraphEdge();
            _t.updateGraphEdge();

            // templating
            // =======================
            var template;
            if (_t.sigmajs.graph) {
                template = templates.tank.plugins.stats.panel({ id: this.id, tank: _t, node_count: _t.sigmajs.graph.nodes().length, edge_count: _t.sigmajs.graph.edges().length });
            } else {
                template = templates.tank.plugins.stats.panel({ id: this.id, tank: _t, node_count: 0, edge_count: 0});
            }
            document.getElementById(this.id).innerHTML = template;

            // Adding the listeners
            // =======================
            // On change color
            for (j = 0; j < document.getElementsByClassName(_self.id + ' color').length; j++) {
                document.getElementsByClassName(_self.id + ' color')[j].addEventListener("change", this.eventOnChangeColor, false);
            }
            // On change size on label
            for (j = 0; j < document.getElementsByClassName(_self.id + ' size').length; j++) {
                document.getElementsByClassName(_self.id + ' size')[j].addEventListener("change", this.eventOnChangeSize, false);
            }
            // On change shape on type
            for (j = 0; j < document.getElementsByClassName(_self.id + ' shape').length; j++) {
                document.getElementsByClassName(_self.id + ' shape')[j].addEventListener("change", this.eventOnChangeShape, false);
            }
            // Toggle modify form
            for (j = 0; j < document.getElementsByClassName(_self.id + "-modify").length; j++) {
                document.getElementsByClassName(_self.id + "-modify")[j].addEventListener("click", this.eventToggleModifyForm, false);
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
        this.calculateLabelEdgeFromSigma();
        this.render();
    };


}).call(this);