(function () {
    "use strict";

    angular.module("app").filter("dagFilter", dagFilter);

    function dagFilter() {
        return function (input, dag) {
            return input.filter(function (les) {
                return les.Dag.Naam == dag
            });
        }
    }
})();