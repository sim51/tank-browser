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
         * Event : when display form to change edge/node attributs
         */
        this.eventToggleModifyForm = function () {
            console.log("[tank.plugins.stats] => toggle modify form");
            var form = this.nextElementSibling;
            if (form.style.display == "block") {
                form.style.display = 'none';
            } else {
                form.style.display = 'block';
            }
        };

        /**
         * Event : change color for label.
         */
        this.eventOnChangeColorLabel = function () {
            console.log("[tank.plugins.stats] => color label");
            var id = this.getAttribute("data-id");
            _t.labels[id].color = '#' + this.value;

            // Calling the refresh method
            _self.refresh();
        };

        /**
         * Event : change size for label.
         */
        this.eventOnChangeSizeLabel = function () {
            console.log("[tank.plugins.stats] => size label");
            var id = this.getAttribute("data-id");
            _t.labels[id].size = this.value;

            // Calling the refresh method
            _self.refresh();
        };

        /**
         * Event : change color for type.
         */
        this.eventOnChangeColorType = function () {
            console.log("[tank.plugins.stats] => color type");
            var id = this.getAttribute("data-id");
            _t.types[id].color = '#' + this.value;

            // Calling the refresh method
            _self.refresh();
        };

        /**
         * Event : change size for type.
         */
        this.eventOnChangeSizeType = function () {
            console.log("[tank.plugins.stats] => size type");
            var id = this.getAttribute("data-id");
            _t.types[id].size = this.value;

            // Calling the refresh method
            _self.refresh();
        };

        /**
         * Event : change shape for type.
         */
        this.eventOnChangeShapeType = function () {
            console.log("[tank.plugins.stats] => shape type");
            var id = this.getAttribute("data-id");
            _t.types[id].shape = this.value;

            // Calling the refresh method
            _self.refresh();
        };

        /**
         * Function that generate the render of this module.
         */
        this.render = function () {
            var i, j, nodes, node, edges, edge, label;

            // templating
            // =======================
            var template;
            if (_t.sigmajs.graph) {

                //FIXME: redo with underscore

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
                template = templates.tank.plugins.stats.panel({ id: this.id, tank: _t, node_count: _t.sigmajs.graph.nodes().length, edge_count: _t.sigmajs.graph.edges().length });
            } else {
                template = templates.tank.plugins.stats.panel({ id: this.id, tank: _t, node_count: 0, edge_count: 0});
            }
            document.getElementById(this.id).innerHTML = template;

            // Adding the listeners
            // =======================
            // FIXME : refactor to be more generic ?
            // On change color on label
            for (j = 0; j < document.getElementsByClassName(_self.id + ' color labels').length; j++) {
                document.getElementsByClassName('color labels')[j].addEventListener("change", this.eventOnChangeColorLabel, false);
            }
            // On change size on label
            for (j = 0; j < document.getElementsByClassName(_self.id + ' size labels').length; j++) {
                document.getElementsByClassName('size labels')[j].addEventListener("change", this.eventOnChangeSizeLabel, false);
            }
            // On change color on type
            for (j = 0; j < document.getElementsByClassName(_self.id + ' color types').length; j++) {
                document.getElementsByClassName('color types')[j].addEventListener("change", this.eventOnChangeColorType, false);
            }
            // On change size on type
            for (j = 0; j < document.getElementsByClassName(_self.id + ' size types').length; j++) {
                document.getElementsByClassName('size types')[j].addEventListener("change", this.eventOnChangeSizeType, false);
            }
            // On change shape on type
            for (j = 0; j < document.getElementsByClassName(_self.id + ' shape types').length; j++) {
                document.getElementsByClassName('shape types')[j].addEventListener("change", this.eventOnChangeShapeType, false);
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
        this.render();
    };


}).call(this);