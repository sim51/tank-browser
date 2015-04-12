;(function (undefined) {
    'use strict';

    if (typeof tank === 'undefined')
        throw 'tank is not declared';

    // Packages initialization:
    sigma.utils.pkg('tank.settings');

    var settings = {

        // id of the dom element
        id: 'tank-container',

        // default query
        query: {
            title: 'Get some data',
            query: 'MATCH (n) OPTIONAL MATCH (n)-[r]->(m) RETURN n,r,m LIMIT 1'
        },

        // Custom labels & types array
        labels: [], // must contain object like {  name: 'my label' , color : '#FFFFFF', size:1}
        types: [], // must contain object like {  name: 'my type' , color : '#FFFFFF', size:1, shape:'curve' }

        // Plugin list
        // ===========================
        plugins: ['query', 'codemirror', 'favorite', 'history', 'config' , 'stats', 'data', 'graphtools', 'sigma_dragnode', 'discoverGraph'],

        // General config
        // ===========================
        // Neo4j url
        neo4j : {
            url : 'http://localhost:7474',
            user: 'neo4j',
            password: 'admin'
        },

        // List of favorites query
        favorites: [],

        // Table of field that can be used of label on graph
        field_named: ['title', 'name' , 'label'],
        // Node size depend of their degrees ?
        node_relative_size: false,
        default_node_size : 5,
        default_edge_size : 2,
        default_edge_shape : 'tapered',

        // Sigmajs config
        // ============================
        sigmajs: {
            minNodeSize: 0,
            maxNodeSize: 10,
            minEdgeSize: 0.1,
            maxEdgeSize: 5,
            defaultEdgeType: 'tapered',
            enableEdgeHovering: true,
            edgeHoverSizeRatio: 1,
            edgeHoverExtremities: true,
            drawLabels: true,
            drawEdgeLabels: true,
            doubleClickEnabled: false
        },

        // Force atlas2 algo default time
        forceAtlas2Time: 5000,
        // Force atalas2 configuration
        forceAtlas2 : {
            linLogMode: false,
            outboundAttractionDistribution: false,
            adjustSizes: false,
            edgeWeightInfluence: 0,
            scalingRatio: 1,
            strongGravityMode: false,
            gravity: 1,
            slowDown: 1,
            barnesHutOptimize: true,
            barnesHutTheta: 0.5,
            startingIterations: 1,
            iterationsPerRender: 1
        },

        // Configuration for plugin graphtool
        graphtools : {
            ratioCoef : 1.5,
            rotateStep: 0.05,
            animationDuration : 150
        }

    };

    // Export the previously designed settings:
    tank.settings = sigma.utils.extend(tank.settings || {}, settings);

}).call(this);
