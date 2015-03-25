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
            }
        });


        // Initiate plugins
        // =========================
        for (i = 0; i< this.settings.plugins.length; i++) {
            name = this.settings.plugins[i];
            this.plugins[name] = new tank.classes.plugins[name](_self);
        }

        /**
         * Closure callback function for sigma & neo4j execute cypher method.
         *
         * @param s {Sigma} The sigmajs instance
         * @param g {Graph} The graph object representation
         */
        this.onGraphDataLoaded = function (tankId) {
            return function (s, g) {

                var t = tank.instance(tankId);

                // Refresh all plugin wit current data
                for (var i in t.plugins ) {
                    t.plugins[i].refresh();
                }

                var i, j, k, node, edge, field, label, type;
                // Change node label
                for (i in s.graph.nodes()) {
                    node = s.graph.nodes()[i];

                    // changing color
                    for (j in t.labels) {
                        label = t.labels[j];
                        for (k in node.labels) {
                            if (node.labels[k] === label.name) {
                                delete node.color;
                                if (node.colors)
                                    node.colors.push(label.color);
                                else
                                    node.colors = [label.color];
                            }
                        }
                    }

                    // changing label
                    for (j in t.settings.field_named) {
                        field = t.settings.field_named[j];
                        if (node[field]) {
                            node.label = node[field];
                            break;
                        }
                    }
                }

                // Change edge label
                for (i in s.graph.edges()) {
                    edge = s.graph.edges()[i];

                    // changing color
                    for (j in t.types) {
                        type = t.types[j];
                        if (edge.type === type.name) {
                            edge.color = type.color;
                        }
                    }

                    // changing label
                    for (j in t.settings.field_named) {
                        field = t.settings.field_named[j];
                        if (edge[field]) {
                            edge.label = edge[field];
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
                    barnesHutOptimize: false,
                    barnesHutTheta: 0.5,
                    startingIterations: 1,
                    iterationsPerRender: 1
                });

                s.refresh();

                // setting the timeout
                window.setTimeout(function () {
                   s.stopForceAtlas2();
                }, t.settings.forceAtlas2Time, s);

                // drag node
                // Initialize the dragNodes plugin:
                var dragListener = sigma.plugins.dragNodes(s, s.renderers[0]);
                dragListener.bind('startdrag', function (event) {
                    console.log(event);
                });
                dragListener.bind('drag', function (event) {
                    console.log(event);
                });
                dragListener.bind('drop', function (event) {
                    console.log(event);
                });
                dragListener.bind('dragend', function (event) {
                    console.log(event);
                });
            };

        };

        // We call the refresh methode
        this.refresh();

    };

    /**
     * Refresh the tank instance.
     */
    tank.prototype.refresh = function () {
        // Refresh sigma
        this.sigmajs.killForceAtlas2();
        this.sigmajs.graph.clear();
        this.sigmajs.refresh();

        if (this.query && this.query.query) {
            sigma.neo4j.cypher(
                this.settings.server,
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
        return _.findWhere(this.types, {name: name})
    }

    /**
     * Return the Lael that match the name
     *
     * @param {string}  name    Name of the type to search
     */
    tank.prototype.findLabelByName = function( name ) {
        return _.findWhere(this.labels, {name: name})
    }


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