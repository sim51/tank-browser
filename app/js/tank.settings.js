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
            query: 'MATCH (n) OPTIONAL MATCH (n)-[r]->(m) RETURN n,r,m LIMIT 100'
        },

        // Custome labels & types array
        labels: [], // must contain object like {  name: 'my label' , color : '#FFFFFF', size:1}
        types: [], // must contain object like {  name: 'my type' , color : '#FFFFFF', size:1, shape:'curve' }

        // Plugin list
        // ===========================
        plugins: ['query', 'codemirror', 'favorite', 'history', 'config' , 'stats'],

        // General config
        // ===========================
        // Neo4j url
        neo4j : {
            url : 'http://localhost:7474',
            user: 'neo4j',
            password: 'admin'
        },
        // Force atlas2 algo default time
        forceAtlas2Time: 5000,
        // Table of field that can be used of label on graph
        field_named: ['title', 'name' , 'label'],
        default_node_size : 1,
        default_edge_size : 0.1,
        default_edge_shape : 'tapered',

        // Sigmajs config
        // ============================
        sigmajs: {
            minNodeSize: 0,
            maxNodeSize: 10,
            minEdgeSize: 0.1,
            maxEdgeSize: 2,
            enableEdgeHovering: true,
            edgeHoverSizeRatio: 2,
            edgeHoverExtremities: true,
            drawLabels: true,
            drawEdgeLabels: true
        }

    };

    // Export the previously designed settings:
    tank.settings = sigma.utils.extend(tank.settings || {}, settings);

}).call(this);
