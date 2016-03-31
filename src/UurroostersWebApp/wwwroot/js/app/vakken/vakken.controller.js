(function () {
    "use strict";

    angular.module("vakkenApp").controller("vakkenCtrl", vakkenCtrl);

    function vakkenCtrl($controller, vakkenService, $location) {
        var vm = this;

        angular.extend(vm, $controller("baseIndexCtrl", {
            vm: this,
            $location: $location,
            myService: vakkenService,
            entityName: "Vak",
            entityPlural: "Vakken"
        }));

        vm.init();

        vm.includeSearchOptions = function () {
            return "";
        }
    }
})();