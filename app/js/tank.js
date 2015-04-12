;(function (undefined) {
    'use strict';

    var __instances = {};

    /**
     * The tank constructor.
     *
     * @param conf
     */
    var tank = function (conf) {

        // Private attributes:
        // =======================
        var _self = this,
            _conf = conf || {},
            i;

        // Init settings
        // =========================
        this.settings = tank.utils.extend(tank.settings, _conf);


        // The default local var
        // =========================
        this.query = this.settings.query;


        // Id of this instance
        // =========================
        this.id = this.settings.id;
        __instances[this.id] = this;


        // Define object attributes
        // =========================
        Object.defineProperty(this, 'plugins', {
            value: [],
            configurable: true
        });
        Object.defineProperty(this, 'labels', {
            value: this.settings.labels,
            configurable: true
        });
        Object.defineProperty(this, 'types', {
            value: this.settings.types,
            configurable: true
        });

        if(!document.getElementById(this.id)) {
            document.getElementById(this.id).innerHTML = '<div id="' + this.id + '" class=\"tank-container\"><i id="' + this.id + '-spinner"class="fa fa-spinner fa-pulse fa-3x"></i></div>';
        }


        /**
         * Initialize all plugin
         */
        this.initPlugins = function () {
            for (i = 0; i< this.settings.plugins.length; i++) {
                var name = this.settings.plugins[i];
                this.plugins[name] = new tank.classes.plugins[name](_self);
            }
        };

        /**
         * Refresh all enabled plugin.
         */
        this.refreshPlugins = function () {
            for (var i in this.plugins ) {
                this.plugins[i].refresh();
            }
        };

        /**
         * Initialize sigmajs.
         */
        this.initSigmajs = function () {
            // Sigmajs
            // =========================
            // first we create (if needed) a dom element with the good id
            var sigmaDomId = this.id + '-graph';
            if(!document.getElementById(sigmaDomId)) {
                document.getElementById(this.id).innerHTML = '<div id="' + sigmaDomId + '"></div>';
            }

            // init sigma
            this.sigmajs = new sigma({
                renderer: {
                    container: document.getElementById(sigmaDomId),
                    type: 'canvas'
                },
                settings: this.settings.sigmajs
            });
        };

        /**
         * Update sigma graph node.
         */
        this.updateGraphNode = function () {
            var s = this.sigmajs, i, j, k, node, field, label;

            // Change node label & color
            // step 1 : reinitialize colors attributes
            _.each(s.graph.nodes(), function (node) {
                node.colors = [];
            });
            for (i in s.graph.nodes()) {
                node = s.graph.nodes()[i];

                // changing style of node
                for (j in this.labels) {
                    label = this.labels[j];
                    for (k in node.neo4j_labels) {
                        if (node.neo4j_labels[k] === label.name) {
                            // Color
                            delete node.color;
                            if (node.colors) {
                                node.colors.push(label.color);
                            } else {
                                node.colors = [label.color];
                            }
                            // Size
                            node.size = label.size;
                        }
                    }
                }

                // changing label
                for (j in this.settings.field_named) {
                    field = this.settings.field_named[j];
                    if (node.neo4j_data[field]) {
                        node.label = node.neo4j_data[field];
                        break;
                    }
                }

                // changing the 'relative' size
                if(this.settings.node_relative_size) {
                    var degree = this.sigmajs.graph.degree(node.id);
                    node.size = node.size * (1 + Math.log(degree));
                }
            }
        };

        /**
         * Update sigma graph edge.
         */
        this.updateGraphEdge = function () {
            var s = this.sigmajs, i, j, edge, field, type;

            // Change edge label
            for (i in s.graph.edges()) {
                edge = s.graph.edges()[i];

                // changing edge style
                for (j in this.types) {
                    type = this.types[j];
                    if (edge.neo4j_type === type.name) {
                        edge.color = type.color;
                        edge.size = type.size;
                        edge.type = type.shape;
                    }
                }

                // changing label
                for (j in this.settings.field_named) {
                    field = this.settings.field_named[j];
                    if (edge.neo4j_data[field]) {
                        edge.label = edge.neo4j_data[field];
                        break;
                    }
                }
            }
        };

        /**
         * Closure callback function for sigma & neo4j execute cypher method.
         *
         * @param s {Sigma} The sigmajs instance
         * @param g {Graph} The graph object representation
         */
        this.onGraphDataLoaded = function (tankId) {
            return function (s, g) {

                var t = tank.instance(tankId);

                // refresh all plugin when data are loaded
                t.refreshPlugins();

                // upgrade graph data for display
                t.updateGraphNode();
                t.updateGraphEdge();

                // starting forceatlas2 algo
                s.startForceAtlas2(t.settings.forceAtlas2);

                // setting the timeout
                window.setTimeout(function () {
                   s.stopForceAtlas2();
                }, t.settings.forceAtlas2Time, s);

                t.spinnerStop();
            };

        };

        /**
         * Function that enable the spinner.
         */
        this.spinnerStart = function() {
            if(document.getElementById(this.id + '-spinner')) {
                document.getElementById(this.id + '-spinner').style.display = 'block';
            }
        };
        /**
         * Function that disable the spinner.
         */
        this.spinnerStop = function() {
            if(document.getElementById(this.id + '-spinner')) {
                document.getElementById(this.id + '-spinner').style.display = 'none';
            }
        };

        // Init sigmajs instance
        this.initSigmajs();

        // Init all plugins
        this.initPlugins();

        // We call the refresh method
        this.refresh();

        this.spinnerStop();

    };

    /**
     * Refresh the tank instance.
     */
    tank.prototype.refresh = function () {
        this.spinnerStart();

        // Reinit sigmajs
        this.sigmajs.kill();
        this.initSigmajs();

        if (this.query && this.query.query) {
            sigma.neo4j.cypher(
                this.settings.neo4j.url,
                this.settings.neo4j.user,
                this.settings.neo4j.password,
                this.query.query,
                this.sigmajs,
                this.onGraphDataLoaded(this.id)
            );
        }
    };

    /**
     * Return the Type that match the name
     *
     * @param {string}  name    Name of the type to search
     */
    tank.prototype.findTypeByName = function( name ) {
        return _.findWhere(this.types, {name: name});
    };

    /**
     * Return the Lael that match the name
     *
     * @param {string}  name    Name of the type to search
     */
    tank.prototype.findLabelByName = function( name ) {
        return _.findWhere(this.labels, {name: name});
    };


    /**
     * Returns a clone of the instances object or a specific running instance.
     *
     * @param  {?string} id Eventually an instance ID.
     * @return {object}     The related instance or a clone of the instances
     *                      object.
     */
    tank.instance = function (id) {
        return arguments.length ?
            __instances[id] :
            sigma.utils.extend({}, __instances);
    };

    /**
     * EXPORT:
     * *******
     */
    if (typeof this.tank !== 'undefined')
        throw 'An object called tank is already in the global scope.';

    this.tank = tank;

}).call(this);