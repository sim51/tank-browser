;(function (undefined) {
    'use strict';

    if (typeof tank === 'undefined')
        throw 'tank is not declared';

    // Create panel package
    sigma.utils.pkg('tank.panels.classes.favorite');

    /**
     * The init function.
     */
    tank.panels.classes.favorite = function (tank) {
        this.list = [];

        // init object by calling refresh method
        var _self = this;
        _self.refresh();
    };

    /**
     * The refresh function.
     */
    tank.panels.classes.favorite.prototype.refresh = function () {

        var i = 0, html = '';
        for (i; i < this.list.length; i++) {
            html += "<li><a href=\"#\" class=\"favorite-query\" data-query-id=\"" + i + "\">" + this.list[i].display + "</a></li>";
        }
        document.getElementById('favorite-list').innerHTML = html;

        // calling the listner after a refresh
        this.eventListener();

    };

    /**
     * The eventListerner function
     */
    tank.panels.classes.favorite.prototype.eventListener = function () {

        // When we click on save
        // =======================
        document.getElementById('save').onclick = function () {

            // adding the current query to favorite
            tank.instance().panels.favorite.list.push({
                query: tank.instance().components.codemirror.getValue(),
                display: tank.instance().components.codemirror.getWrapperElement().getElementsByClassName('CodeMirror-code')[0].innerHTML
            });

            tank.instance().panels.favorite.refresh();
        };

        // Click on an favorite query
        // ===========================
        var onclick = function() {
            var id = this.getAttribute("data-query-id");
            tank.instance().components.codemirror.setValue(tank.instance().panels.favorite.list[id].query);
            tank.instance().executeQuery();
        };
        for (var j = 0; j < document.getElementsByClassName('favorite-query').length; j++) {

            document.getElementsByClassName('favorite-query')[j].onclick = onclick;
        }
    };

}).call(this);
