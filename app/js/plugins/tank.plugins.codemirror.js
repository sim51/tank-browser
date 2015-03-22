;(function (undefined) {
    'use strict';

    if (typeof tank === 'undefined')
        throw 'tank is not declared';

    // Create panel package
    sigma.utils.pkg('tank.classes.plugins.codemirror');

    // Init codemirror plugin
    tank.classes.plugins.codemirror = function(tank) {

        var editor = CodeMirror.fromTextArea(document.getElementById('cypher-query'), {
            lineNumbers: true,
            indentWithTabs: true,
            smartIndent: true,
            mode: "cypher",
            theme: "neo"
        });

        // Adding some key map that permit to run & save the query.
        editor.addKeyMap(
            {
                "Ctrl-Enter": function () {
                    tank.instance().executeQuery();
                },
                "Alt-Enter": function () {
                    tank.instance().executeQuery();
                }
            },
            false
        );
        editor.on('change', function(cm, obj){
            tank.instance().query = cm.getValue();
        });
        return editor;
    };

}).call(this);