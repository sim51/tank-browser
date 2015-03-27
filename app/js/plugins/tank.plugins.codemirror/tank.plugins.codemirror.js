;(function (undefined) {
    'use strict';

    if (typeof tank === 'undefined')
        throw 'tank is not declared';

    // Create panel package
    sigma.utils.pkg('tank.classes.plugins.codemirror');

    // Init codemirror plugin
    tank.classes.plugins.codemirror = function(tank) {

        var _t = tank,
            _self = this;

        /**
         * Function that update the tank query with the textarea.
         */
        this.updateQuery = function (cm, obj) {
            console.log("[tank.plugins.codemirror] => updateQuery : " + cm.getValue());
            _t.query = {
                query : cm.getValue(),
                title : cm.getWrapperElement().getElementsByClassName('CodeMirror-code')[0].innerHTML
            };
        };

        /**
         * Function that the query (ie. tank.refresh()).
         */
        this.runQuery = function () {
            console.log("[tank.plugins.codemirror] => runQuery");
            _t.refresh();
        };

        /**
         * Function that update cm with the tank query value
         */
        this.render = function () {
            // Init codemirror
            _self.editor = CodeMirror.fromTextArea(document.getElementById(tank.id + "-query-value"), {
                lineNumbers: true,
                indentWithTabs: true,
                smartIndent: true,
                mode: "cypher",
                theme: "neo",
                lineWrapping: true
            });

            // Event listener / bind key
            // ================================
            // ON change event
            _self.editor.on('change', this.updateQuery);
            // Adding some key map that permit to run & save the query.
            _self.editor.addKeyMap(
                {
                    "Ctrl-Enter": this.runQuery,
                    "Alt-Enter": this.runQuery
                },
                false
            );

            _self.editor.setValue(_t.query.query);
        };

    };

    /**
     * The refresh function.
     */
    tank.classes.plugins.codemirror.prototype.refresh = function () {
        this.render();
    };

}).call(this);