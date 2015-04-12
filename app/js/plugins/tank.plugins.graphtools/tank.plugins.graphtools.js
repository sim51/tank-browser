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
            domContainer.setAttribute("class", "tank-container-graphtools");
            document.getElementById(_t.id).appendChild(domContainer);
        }

        /**
         * Event : on click zoom in.
         */
        this.eventOnClicZoomIn = function () {
            sigma.misc.animation.camera(
                _t.sigmajs.cameras[0],
                {ratio: _t.sigmajs.cameras[0].ratio / _t.settings.graphtools.ratioCoef},
                {duration: _t.settings.graphtools.animationDuration}
            );
        };

        /**
         * Event : on click zoom out.
         */
        this.eventOnClicZoomOut = function () {
            sigma.misc.animation.camera(
                _t.sigmajs.cameras[0],
                {ratio: _t.sigmajs.cameras[0].ratio * _t.settings.graphtools.ratioCoef},
                {duration: _t.settings.graphtools.animationDuration}
            );
        };

        /**
         * Event : on click view all.
         */
        this.eventOnClickView = function () {
            sigma.misc.animation.camera(
                _t.sigmajs.cameras[0],
                {x: 0, y: 0, angle: _t.sigmajs.cameras[0].angle, ratio: 1.2},
                {duration: _t.settings.graphtools.animationDuration}
            );
        };

        /**
         * Event : on click rotate right.
         */
        this.eventOnClickRotateRight = function () {
            sigma.misc.animation.camera(
                _t.sigmajs.cameras[0],
                {angle : _t.sigmajs.cameras[0].angle + _t.settings.graphtools.rotateStep},
                {duration: _t.settings.graphtools.animationDuration}
            );
        };

        /**
         * Event : on click rotate left.
         */
        this.eventOnClickRotateLeft = function () {
            sigma.misc.animation.camera(
                _t.sigmajs.cameras[0],
                {angle : _t.sigmajs.cameras[0].angle - _t.settings.graphtools.rotateStep},
                {duration: _t.settings.graphtools.animationDuration}
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
         * Event : on click flullscreen
         */
        this.eventOnClickFullscreen = function () {
            var graphParent = document.getElementById(_t.id + "-graph").parentNode;
            if(graphParent.classList.contains("fullscreen")) {
                graphParent.classList.remove("fullscreen");
            }
            else {
                graphParent.classList.add("fullscreen");
            }
            _t.sigmajs.refresh();
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
            // Zoom in / out
            document.getElementById(this.id +"-zoom-in").addEventListener("click", this.eventOnClicZoomIn, false);
            document.getElementById(this.id +"-zoom-out").addEventListener("click", this.eventOnClicZoomOut, false);
            // Force atlas
            document.getElementById(this.id +"-forceatlas-start").addEventListener("click", this.eventOnClickStartForceAtlas, false);
            document.getElementById(this.id +"-forceatlas-stop").addEventListener("click", this.eventOnClickStopForceAtlas, false);
            // Picture
            document.getElementById(this.id +"-window").addEventListener("click", this.eventOnClickWindow, false);
            document.getElementById(this.id +"-graph").addEventListener("click", this.eventOnClickGraph, false);
            // Rotate
            document.getElementById(this.id +"-rotate-right").addEventListener("click", this.eventOnClickRotateRight, false);
            document.getElementById(this.id +"-rotate-left").addEventListener("click", this.eventOnClickRotateLeft, false);
            // Fullscreen
            document.getElementById(this.id +"-fullscreen").addEventListener("click", this.eventOnClickFullscreen, false);

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
