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

    angular.module("uurroostersApp").filter("uniekeLessen", uniekeLessen)

    function uniekeLessen() {
        return function (input) {
            var lessen = [];
            
            function zelfdeLes(l1, l2) {
                return l1.Vak.Id == l2.Vak.Id &&
                       l1.Leerkracht.Id == l2.Leerkracht.Id &&
                       l1.Lokaal.Id == l2.Lokaal.Id;
            }

            input.forEach(function (les) {
                var index = lessen.findIndex((l) => zelfdeLes(l, les));
                if (index == -1) lessen.push(les);
            });

            return lessen;
        }
    }
})();