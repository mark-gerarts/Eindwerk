(function () {
    "use strict";

    angular.module("leerkrachtenApp").controller("leerkrachtenDetailsCtrl", leerkrachtenDetailsCtrl);

    function leerkrachtenDetailsCtrl($controller, leerkrachtenService, vakkenService, $routeParams) {
        var vm = this;

        angular.extend(vm, $controller("baseDetailsCtrl", {
            vm: this,
            $routeParams: $routeParams,
            myService: leerkrachtenService,
            entityName: "Leerkracht",
            entityPlural: "Leerkrachten"
        }));

        vm.init();

        vm.vakken = [];
        vakkenService.async().then(function (r) {
            vm.vakken = vakkenService.getAll();
        }, function (e) {
            //
        });
    }
})();