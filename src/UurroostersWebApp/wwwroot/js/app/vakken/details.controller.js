(function () {
    "use strict";

    angular.module("vakkenApp").controller("vakkenDetailsCtrl", vakkenDetailsCtrl);

    function vakkenDetailsCtrl($controller, vakkenService, $routeParams) {
        var vm = this;

        angular.extend(vm, $controller("baseDetailsCtrl", {
            vm: this,
            $routeParams: $routeParams,
            myService: vakkenService,
            entityName: "Vak",
            entityPlural: "Vakken"
        }));

        vm.init();        
    }
})();