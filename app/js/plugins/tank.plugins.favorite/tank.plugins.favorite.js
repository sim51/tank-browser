;(function (undefined) {
    'use strict';

    if (typeof tank === 'undefined')
        throw 'tank is not declared';

    // Create panel package
    sigma.utils.pkg('tank.classes.plugins.favorite');

    // init the favorite list on tank prototype;
    tank.prototype.favorites = [];

    /**
     * The init function.
     */
    tank.classes.plugins.favorite = function (tank) {

        // Init variables:
        var _self = this,
            _t = tank;

        this.id = _t.id + "-favorite";

        // init favorites array
        _t.favorites = _t.settings.favorites;

        // Create the dom query container if it not exist
        if(!document.getElementById(this.id)) {
            var domContainer = document.createElement("div");
            domContainer.setAttribute("id", this.id);
            document.getElementById(_t.id).appendChild(domContainer);
        }

        /**
         * Event : run the favorite query
         */
        this.eventRunFavorite = function () {
            console.log("[tank.plugins.favorite] => eventRunFavorite");
            var itemId = this.getAttribute("data-id");
            _t.query = _t.favorites[itemId];
            _t.refresh();
        };

        /**
         * Event : save the current query into favorite.
         */
        this.eventSaveFavorite = function () {
            console.log("[tank.plugins.favorite] => eventSaveFavorite");
            if(_.findWhere(_t.favorites, { query: _t.query.query }) === undefined ) {
                _t.favorites.push(_t.query);
            }
            _self.render();
        };

        /**
         * Event : remove the favorite.
         */
        this.eventRemoveFavorite = function () {
            console.log("[tank.plugins.favorite] => eventRemoveFavorite");
            var itemId = this.getAttribute("data-id");
            _t.favorites.remove(itemId);
            _self.render();
        };

        /**
         * Function that generate the render of this module.
         */
        this.render = function () {

            // templating
            // =======================
            var template = templates.tank.plugins.favorite.panel({ id: this.id, tank: _t});
            document.getElementById(this.id).innerHTML = template;

            // Save button into the render of query (if exist)
            if(!document.getElementById(this.id + "-save") && _t.plugins.query) {
                template = templates.tank.plugins.favorite.button({ id: this.id, tank: _t});
                document.getElementById(_t.plugins.query.id + "-run").insertAdjacentHTML('beforebegin', template);
            }

            // Adding the listeners
            // =======================
            // On link to run query
            for (var j = 0; j < document.getElementsByClassName(this.id + "-link").length; j++) {
                document.getElementsByClassName(this.id + "-link")[j].addEventListener("click", this.eventRunFavorite, false);
            }
            // On link to remove query
            for (j = 0; j < document.getElementsByClassName(this.id + "-remove").length; j++) {
                document.getElementsByClassName(this.id + "-remove")[j].addEventListener("click", this.eventRemoveFavorite, false);
            }
            // On link to save the current query
            if(_t.plugins.query) {
                document.getElementById(this.id + "-save").addEventListener("click", this.eventSaveFavorite, false);
            }
        };

        _self.refresh();
    };

    /**
     * The refresh function.
     */
    tank.classes.plugins.favorite.prototype.refresh = function () {
        this.render();
    };

}).call(this);
