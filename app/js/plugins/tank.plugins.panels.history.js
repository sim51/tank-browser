;(function (undefined) {
    'use strict';

    if (typeof tank === 'undefined')
        throw 'tank is not declared';

    // Create panel package
    sigma.utils.pkg('tank.panels.classes.history');

    /**
     * The init function.
     */
    tank.panels.classes.history = function (tank) {
        // the history heap
        this.list = [];

        // init object by calling refresh method
        var _self = this;
        _self.refresh();

        // When a query is executed, we save it into history
        window.addEventListener( 'run-query', _self.execute, false );


    };

    /**
     * The refresh function.
     */
    tank.panels.classes.history.prototype.refresh = function () {

        // Generate the HTML output of the history
        var i = (this.list.length - 1), html = '';
        for (i; i >= 0; i--) {
            html += "<li>" +
                "<span class=\"timeago\">" + tank.utils.timeago(this.list[i].time) + "</span>" +
                "<a href=\"#\" class=\"history-query\" data-query-id=\"" + i + "\">" + this.list[i].display + "</a>" +
                "</li>";
        }
        // Replace the current HTML
        document.getElementById('history-list').innerHTML = html;

        // Refresh listener
        this.eventListener();
    };

    /**
     * The eventListerner function.
     */
    tank.panels.classes.history.prototype.eventListener = function () {

        // Click on an history query
        // ===========================
        var onclick = function () {
            var id = this.getAttribute("data-query-id");
            tank.instance().components.codemirror.setValue(tank.panels.history.list[id].query);
            tank.instance().executeQuery();
        };
        for (var j = 0; j < document.getElementsByClassName('history-query').length; j++) {
            document.getElementsByClassName('history-query')[j].onclick = onclick;
        }

    };

    /**
     * Function that add the current query to the history.
     * It's a 'static' method,  so don't use this.
     */
    tank.panels.classes.history.prototype.execute = function () {

        // adding the current query to the history
        tank.instance().panels.history.list.push({
            query: tank.instance().components.codemirror.getValue(),
            time: new Date(),
            display: tank.instance().components.codemirror.getWrapperElement().getElementsByClassName('CodeMirror-code')[0].innerHTML
        });
        tank.instance().panels.history.refresh();
    };


}).call(this);
