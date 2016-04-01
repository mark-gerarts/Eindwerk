(function () {
    "use strict";

    angular.module("leerkrachtenApp").controller("nieuweLeerkrachtenCtrl", nieuweLeerkrachtenCtrl);

    function nieuweLeerkrachtenCtrl($controller, leerkrachtenService, vakkenService) {
        var vm = this;

        angular.extend(vm, $controller("baseNieuwCtrl", {
            vm: this,
            myService: leerkrachtenService,
            entityName: "Leerkracht",
            entityPlural: "Leerkrachten"
        }));

        vm.vakken = [];
        vakkenService.async().then(function (r) {
            vm.vakken = vakkenService.getAll();
        }, function (e) {

        });
    }
})();