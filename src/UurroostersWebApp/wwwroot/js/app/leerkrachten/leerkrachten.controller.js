(function () {
    "use strict";

    angular.module("leerkrachtenApp").controller("leerkrachtenCtrl", leerkrachtenCtrl);

    function leerkrachtenCtrl($controller, leerkrachtenService, vakkenService, $location) {
        var vm = this;

        angular.extend(vm, $controller("baseIndexCtrl", {
            vm: this,
            $location: $location,
            myService: leerkrachtenService,
            entityName: "Leerkracht",
            entityPlural: "Leerkrachten"
        }));

        vm.init();

        vm.vakQuery;
        vm.vakken = [];
        vakkenService.async().then(function (r) {
            vm.vakken = vakkenService.getAll();
        }, function () {
            //
        });
    }
})();