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
        this.settings = tank.utils.extend(tank.settings, conf);


        // The default local var
        // =========================
        this.query = this.settings.query;


        // Identifiant of this instance
        // =========================
        this.id = this.settings.id;
        __instances[this.id] = this;


        // Define object attributs
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

        this.initPlugins = function () {
            for (i = 0; i< this.settings.plugins.length; i++) {
                name = this.settings.plugins[i];
                this.plugins[name] = new tank.classes.plugins[name](_self);
            };
        }

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
        }

        /**
         * Closure callback function for sigma & neo4j execute cypher method.
         *
         * @param s {Sigma} The sigmajs instance
         * @param g {Graph} The graph object representation
         */
        this.onGraphDataLoaded = function (tankId) {
            return function (s, g) {

                var i, j, k, node, edge, field, label, type;
                var t = tank.instance(tankId);

                // Refresh all plugin wit current data
                for (i in t.plugins ) {
                    t.plugins[i].refresh();
                }

                // Change node label
                for (i in s.graph.nodes()) {
                    node = s.graph.nodes()[i];

                    // changing style of node
                    for (j in t.labels) {
                        label = t.labels[j];
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
                    for (j in t.settings.field_named) {
                        field = t.settings.field_named[j];
                        if (node.neo4j_data[field]) {
                            node.label = node.neo4j_data[field];
                            break;
                        }
                    }
                }

                // Change edge label
                for (i in s.graph.edges()) {
                    edge = s.graph.edges()[i];

                    // changing edge style
                    for (j in t.types) {
                        type = t.types[j];
                        if (edge.neo4j_type === type.name) {
                            edge.color = type.color;
                            edge.size = type.size;
                            edge.type = type.shape;
                        }
                    }

                    // changing label
                    for (j in t.settings.field_named) {
                        field = t.settings.field_named[j];
                        if (edge.neo4j_data[field]) {
                            edge.label = edge.neo4j_data[field];
                            break;
                        }
                    }
                }


                // starting forceatlas2 algo
                s.startForceAtlas2({
                    linLogMode: false,
                    outboundAttractionDistribution: false,
                    adjustSizes: true,
                    edgeWeightInfluence: 0,
                    scalingRatio: 1,
                    strongGravityMode: false,
                    gravity: 1,
                    slowDown: 1,
                    barnesHutOptimize: true,
                    barnesHutTheta: 0.5,
                    startingIterations: 1,
                    iterationsPerRender: 1
                });

                s.refresh();

                // setting the timeout
                window.setTimeout(function () {
                   s.stopForceAtlas2();
                }, t.settings.forceAtlas2Time, s);

            };


        };

        // Init sigmajs instance
        this.initSigmajs();

        // Init all plugins
        this.initPlugins();

        // We call the refresh methode
        this.refresh();

    };

    /**
     * Refresh the tank instance.
     */
    tank.prototype.refresh = function () {
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
     * Retunn the Type that match the name
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