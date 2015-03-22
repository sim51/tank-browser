;(function (undefined) {
    'use strict';

    if (typeof tank === 'undefined')
        throw 'tank is not declared';

    // Create panel package
    sigma.utils.pkg('tank.classes.plugins.codemirror');

    // Init codemirror plugin
    tank.classes.plugins.codemirror = function(tank) {

        var editor,
            _t = tank,
            self = this;

        editor = CodeMirror.fromTextArea(document.getElementById(tank.id + "-query-value"), {
            lineNumbers: true,
            indentWithTabs: true,
            smartIndent: true,
            mode: "cypher",
            theme: "neo"
        });

        /**
         * Function that update the tank query with the textarea.
         */
        this.updateQuery = function (cm, obj) {
            console.log("[tank.plugins.codemirror] => updateQuery : " + cm.getValue());
            _t.query.query = cm.getValue();
        }

        /**
         * Function that the query (ie. tank.refresh()).
         */
        this.runQuery = function () {
            console.log("[tank.plugins.codemirror] => runQuery");
            _t.refresh();
        }

        // ON change event
        editor.on('change', this.updateQuery);


        // Adding some key map that permit to run & save the query.
        editor.addKeyMap(
            {
                "Ctrl-Enter": this.runQuery,
                "Alt-Enter": this.runQuery
            },
            false
        );
    };

}).call(this);