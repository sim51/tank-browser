;(function (undefined) {
    'use strict';

    var __instance = {};

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
        this.query =this.settings.query;


        // Identifiant of this instance
        // =========================
        this.id = this.settings.id;
        __instances[this.id] = this;


        // Define object attributs
        // =========================
        Object.defineProperty(this, 'components', {
            value: [],
            configurable: true
        });
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


        // Initiate components
        // =========================
        for (var i in  this.settings.components) {
            var name = this.settings.components[i];
            this.components[name] = new tank.classes.components[name](_self);
        }

        // Initiate plugins
        // =========================
        for (i in this.settings.plugins) {
            name = this.settings.plugins[i];
            this.plugins[name] = new tank.classes.plugins[name](_self);
        }

    };

    /**
     * Execute the current cypher query.
     */
    tank.prototype.refresh = function () {
        this.components.sigmajs.graph.clear();
        this.components.sigmajs.refresh();

        sigma.neo4j.cypher(
            this.settings.server,
            this.query.query,
            this.components.sigmajs,
            this.onGraphDataLoaded
        );

        // Dispatch the 'run-query' event
        window.dispatchEvent(new Event("run-query"));

    };

    /**
     * Callback function for sigma & neo4j execute cypher method.
     *
     * @param s {Sigma} The sigmajs instance
     * @param g {Graph} The graph object representation
     */
    tank.prototype.onGraphDataLoaded = function(s, g) {

        // if graph component is loaded, then we parse the graph to construct some stat
        if(tank.instance().panels.graph) {
            tank.instance().panels.graph.refresh();
        }

        var i, j, k, node, edge, field, label, type;
        // Change node label
        for (i in s.graph.nodes()) {
            node = s.graph.nodes()[i];

            // changing color
            for (j in tank.instance().panels.graph.labels) {
                label = tank.instance().panels.graph.labels[j];
                for( k in node.labels) {
                    if (node.labels[k] === label.name) {
                        if (node['colors'])
                            node['colors'].push(label.color);
                        else
                            node['colors'] = [label.color];
                    }
                }
            }

            // changing label
            for(j in tank.instance().settings.field_named) {
                field = tank.instance().settings.field_named[j];
                if(node[field]) {
                    node.label = node[field];
                    break;
                }
            }
        }

        // Change edge label
        for (i in s.graph.edges()) {
            edge = s.graph.edges()[i];

            // changing color
            for (j in tank.instance().panels.graph.types) {
                type = tank.instance().panels.graph.types[j];
                if(edge.type === type.name) {
                    edge.color = type.color;
                }
            }

            // changing label
            for(j in tank.instance().settings.field_named) {
                field = tank.instance().settings.field_named[j];
                if(edge[field]) {
                    edge.label = edge[field];
                    break;
                }
            }
        }


        // Modify graph datas
        tank.instance().overrideGraphData(s);

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

        // setting the timeout
        window.setTimeout(function() {
            tank.components.sigmajs.stopForceAtlas2();
        }, tank.settings.forceAtlas2Time, s);

        // drag node
        // Initialize the dragNodes plugin:
        var dragListener = sigma.plugins.dragNodes(tank.components.sigmajs, tank.components.sigmajs.renderers[0]);
        dragListener.bind('startdrag', function(event) {
            console.log(event);
        });
        dragListener.bind('drag', function(event) {
            console.log(event);
        });
        dragListener.bind('drop', function(event) {
            console.log(event);
        });
        dragListener.bind('dragend', function(event) {
            console.log(event);
        });

        // Dispatch the 'run-query' event
        window.dispatchEvent(new Event("graph-data-loaded"));
    };

    /**
     * Function that change the sigma graph data and refresh the graph.
     * If sigma instance is null, we take the tank one.
     *
     * @param {Sigma} s     a sigma instance
     */
    tank.prototype.overrideGraphData = function(s) {
    };

    /**
     * Returns a clone of the instances object or a specific running instance.
     *
     * @param  {?string} id Eventually an instance ID.
     * @return {object}     The related instance or a clone of the instances
     *                      object.
     */
    tank.instance = function () {
        return __instance;
    };

    /**
     * EXPORT:
     * *******
     */
    if (typeof this.tank !== 'undefined')
        throw 'An object called tank is already in the global scope.';

    this.tank = tank;

}).call(this);