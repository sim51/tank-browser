;(function (undefined) {
    'use strict';

    if (typeof tank === 'undefined')
        throw 'tank is not declared';

    // Create panel package
    sigma.utils.pkg('tank.classes.plugins.graphtools');

    /**
     * The init function.
     */
    tank.classes.plugins.graphtools = function (tank) {

        // Init variables:
        var _self = this,
            _t = tank;

        this.id = _t.id + "-graphtools";

        // Create the dom button that export all graph
        if(!document.getElementById(this.id)) {
            var domContainer = document.createElement("div");
            domContainer.setAttribute("id", this.id);
            document.getElementById(_t.id).appendChild(domContainer);
        }

        /**
         * Event : on click zoom in.
         */
        this.eventOnClicZoomIn = function () {
            sigma.misc.animation.camera(
                _t.sigmajs.cameras[0],
                {ratio: _t.sigmajs.cameras[0].ratio / 1.5},
                {duration: 150}
            );
        };

        /**
         * Event : on click zoom out.
         */
        this.eventOnClicZoomOut = function () {
            sigma.misc.animation.camera(
                _t.sigmajs.cameras[0],
                {ratio: _t.sigmajs.cameras[0].ratio * 1.5},
                {duration: 150}
            );
        };

        /**
         * Event : on click view all.
         */
        this.eventOnClickView = function () {
            sigma.misc.animation.camera(
                _t.sigmajs.cameras[0],
                {x: 0, y: 0, angle: 0, ratio: 1.2},
                {duration: 150}
            );
        };

        /**
         * Event : on click start forceAtlas.
         */
        this.eventOnClickStartForceAtlas = function () {
            // starting forceatlas2 algo
            _t.sigmajs.startForceAtlas2(_t.settings.forceAtlas2);
        };

        /**
         * Event : on click stop forceAtlas.
         */
        this.eventOnClickStopForceAtlas = function () {
            // starting forceatlas2 algo
            _t.sigmajs.stopForceAtlas2();
        };

        /**
         * Function that generate the graph image.
         * @param clipped {{Boolean}}   generate a clipped image ?
         */
        this.generate = function(clipped) {
            sigma.plugins.image(_t.sigmajs, _t.sigmajs.renderers[0], {
                download: true,
                size: 0,
                margin: 50,
                background: '#FFFFFF',
                clip: clipped,
                zoomRatio: 1,
                labels: _t.settings.sigmajs.drawLabels
            });
        };

        /**
         * Event : on click window.
         */
        this.eventOnClickWindow = function () {
            _self.generate(true);
        };

        /**
         * Event : on click window.
         */
        this.eventOnClickGraph = function () {
            _self.generate(false);
        };

        /**
         * Function that generate the render of this module.
         */
        this.render = function () {

            // Templating
            // =======================
            var template = templates.tank.plugins.graphtools.panel({ id: this.id, tank: _t});
            document.getElementById(this.id).innerHTML = template;

            // Event listener
            // =======================
            document.getElementById(this.id +"-view").addEventListener("click", this.eventOnClickView, false);
            document.getElementById(this.id +"-zoom-in").addEventListener("click", this.eventOnClicZoomIn, false);
            document.getElementById(this.id +"-zoom-out").addEventListener("click", this.eventOnClicZoomOut, false);
            document.getElementById(this.id +"-forceatlas-start").addEventListener("click", this.eventOnClickStartForceAtlas, false);
            document.getElementById(this.id +"-forceatlas-stop").addEventListener("click", this.eventOnClickStopForceAtlas, false);
            document.getElementById(this.id +"-window").addEventListener("click", this.eventOnClickWindow, false);
            document.getElementById(this.id +"-graph").addEventListener("click", this.eventOnClickGraph, false);

        };

        _self.render();
    };


    /**
     * The refresh function.
     */
    tank.classes.plugins.graphtools.prototype.refresh = function () {
        this.render();
    };

}).call(this);