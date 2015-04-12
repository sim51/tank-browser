;(function (undefined) {
    'use strict';

    if (typeof tank === 'undefined')
        throw 'tank is not declared';

    // Create utils package
    sigma.utils.pkg('tank.utils');

/**
 * This function takes any number of objects as arguments, copies from each
 * of these objects each pair key/value into a new object, and finally
 * returns this object.
 *
 * NB: This function is based on the same sigmajs function, but it does it recursively.
 */
    tank.utils.extend = function () {
        var i,
            k,
            res = arguments[0],
            l = arguments.length;

        for (i = l - 1; i >= 0; i--) {
            for (k in arguments[i]) {
                if(res[k] && arguments[i][k].toString() == "[object Object]") {
                    res[k] = tank.utils.extend(res[k], arguments[i][k]);
                }
                else {
                    res[k] = arguments[i][k];
                }
            }
        }
        return res;
    };

}).call(this);