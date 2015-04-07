;(function (undefined) {
    'use strict';

    if (typeof tank === 'undefined')
        throw 'tank is not declared';

    // Create panel package
    sigma.utils.pkg('tank.classes.plugins.discoverGraph');


    /**
     * The init function.
     */
    tank.classes.plugins.discoverGraph = function (tank) {

        // Init variables:
        var _self = this,
            _t = tank,
            query = "MATCH (n)-[r]-(m)WHERE id(n)=@id@ RETURN n,r,m";


        /**
         * Merge new graph data into sigmajs graph instance.
         *
         * @param s a pseudo sigmajs instance
         * @param g nothing ...
         */
        this.mergeData = function (currentNode) {
            return function (s, g) {
                _.each(s.nodes, function (node, index) {
                    if (_.findWhere(_t.sigmajs.graph.nodes(), { id: node.id}) === undefined) {
                        node.x = currentNode.x + Math.cos(Math.PI * 2 * index / s.nodes.length - Math.PI / 2);
                        node.y = currentNode.y + Math.sin(Math.PI * 2 * index / s.nodes.length - Math.PI / 2);
                        _t.sigmajs.graph.addNode(node);
                    }
                });
                _.each(s.edges, function (edge) {
                    if (_.findWhere(_t.sigmajs.graph.edges(), { id: edge.id}) === undefined) {
                        _t.sigmajs.graph.addEdge(edge);
                    }
                });

                _t.refreshPlugins();
                _t.updateGraphNode();
                _t.updateGraphEdge();

                // upgrade graph data for display
                _t.sigmajs.refresh();

                _t.spinnerStop();
            };
        };


            /**
             * Register sigmajs bind event.
             */
            this.registerSigmaBind = function () {

                // Bind display node data
                tank.sigmajs.bind("doubleClickNode", function (e) {
                    _t.spinnerStart();
                    var cypher = query.replace('@id@', e.data.node.id);
                    sigma.neo4j.cypher(
                        _t.settings.neo4j.url,
                        _t.settings.neo4j.user,
                        _t.settings.neo4j.password,
                        cypher,
                        undefined,
                        _self.mergeData(e.data.node));
                });
            };

        };


        /**
         * The refresh function.
         */
        tank.classes.plugins.discoverGraph.prototype.refresh = function () {
            this.registerSigmaBind();
        };

    }
    ).
    call(this);
