;(function (undefined) {
    'use strict';

    if (typeof tank === 'undefined')
        throw 'tank is not declared';

    // Create panel package
    sigma.utils.pkg('tank.panels.classes.graph');

    /**
     * The init function.
     */
    tank.panels.classes.graph = function (tank) {
        this.labels = [];
        this.types = [];
        this.jscolor = jscolor;
        jscolor.dir = './js/lib/jscolor/';

        // init object by calling refresh method
        var _self = this;

        // When a query is executed, we save it into history
        window.addEventListener('graph-data-loaded', _self.refresh, false);
    };

    /**
     * The refresh function.
     */
    tank.panels.classes.graph.prototype.refresh = function () {
        var i, j, label, node, nodes, edge, edges, type;

        // reset counter
        for (i in tank.instance().panels.graph.labels) {
            tank.instance().panels.graph.labels[i].count = 0;
        }
        // reset counter
        for (i in tank.instance().panels.graph.types) {
            tank.instance().panels.graph.types[i].count = 0;
        }

        // update labels
        nodes = tank.instance().components.sigmajs.graph.nodes();
        for (i in tank.instance().components.sigmajs.graph.nodes()) {
            node = nodes[i];
            for (j in node.labels) {
                label = node.labels[j];
                if (!tank.instance().panels.graph.labels[label]) {
                    // adding the current label to the list
                    tank.instance().panels.graph.labels[label] = {
                        name: label,
                        color: tank.utils.randomcolor(),
                        count : 1
                    };
                }
                else {
                    tank.instance().panels.graph.labels[label].count += 1;
                }
            }
        }
        tank.instance().panels.graph.displayLabels();

        // update types
        edges = tank.instance().components.sigmajs.graph.edges();
        for (i in tank.instance().components.sigmajs.graph.edges()) {
            edge = edges[i];
            if (!tank.instance().panels.graph.types[edge.type]) {
                // adding the current type to the list
                tank.instance().panels.graph.types[edge.type] = {
                    name: edge.type,
                    color: tank.utils.randomcolor(),
                    count : 1
                };
            }
            else {
                tank.instance().panels.graph.types[edge.type].count += 1;
            }
        }
        tank.instance().panels.graph.displayTypes();

        // update stats data
        document.getElementById('numberOfNode').innerHTML = '' + tank.instance().components.sigmajs.graph.nodes().length;
        document.getElementById('numberOfEdge').innerHTML = '' + tank.instance().components.sigmajs.graph.edges().length;

        tank.instance().panels.graph.eventListener();
    };

    /**
     * The eventListerner function.
     */
    tank.panels.classes.graph.prototype.eventListener = function () {
        var j,id;

        // Change color on a type
        // ===========================
        var onChangeColorType = function () {
            id = this.getAttribute("data-type");
            tank.instance().panels.graph.types[id].color = '#' + this.value;
        };
        for (j = 0; j < document.getElementsByClassName('color types').length; j++) {
            document.getElementsByClassName('color types')[j].onchange = onChangeColorType;
        }

        // Change color on a label
        // ===========================
        var onChangeColorLabel = function () {
            id = this.getAttribute("data-label");
            tank.instance().panels.graph.labels[id].color = '#' + this.value;
        };
        for (j = 0; j < document.getElementsByClassName('color labels').length; j++) {
            document.getElementsByClassName('color labels')[j].onchange = onChangeColorLabel;
        }
    };

    /**
     * Function that display labels in graph panel.
     */
    tank.panels.classes.graph.prototype.displayLabels = function () {
        var i = 0, html = '';
        for (i in tank.instance().panels.graph.labels) {
            html += '<li>' +
                '' + tank.instance().panels.graph.labels[i].name + ' (' + tank.instance().panels.graph.labels[i].count + ')' +
                '<input class="color labels pull-right" data-label="' + tank.instance().panels.graph.labels[i].name + '" value="' + tank.instance().panels.graph.labels[i].color + '" />' +
                '</li>';
        }
        document.getElementById('labels').innerHTML = html;
        jscolor.init();
    };

    /**
     * Function that display types in graph panel.
     */
    tank.panels.classes.graph.prototype.displayTypes = function () {
        var i = 0, html = '';
        for (i in tank.instance().panels.graph.types) {
            html += '<li>' +
                '' + tank.instance().panels.graph.types[i].name + ' (' + tank.instance().panels.graph.types[i].count + ')' +
            '<input class="color types pull-right" data-type="' + tank.instance().panels.graph.types[i].name + '" value="' + tank.instance().panels.graph.types[i].color + '" />' +
                '</li>';
        }
        document.getElementById('types').innerHTML = html;
        jscolor.init();
    };

}).call(this);