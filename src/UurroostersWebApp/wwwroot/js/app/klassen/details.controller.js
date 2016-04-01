(function () {
    "use strict";

    angular.module("klassenApp").controller("klassenDetailsCtrl", klassenDetailsCtrl);

    function klassenDetailsCtrl($controller, klassenService, campussenService, studierichtingenService, $routeParams) {
        var vm = this;

        angular.extend(vm, $controller("baseDetailsCtrl", {
            vm: this,
            $routeParams: $routeParams,
            myService: klassenService,
            entityName: "Klas",
            entityPlural: "Klassen"
        }));

        vm.init();

        vm.campussen = [];
        campussenService.async().then(function (r) {
            vm.campussen = campussenService.getAll();
        }, function () {
            //
        });

        vm.studierichtingen = [];
        studierichtingenService.async().then(function (r) {
            vm.studierichtingen = studierichtingenService.getAll();
        }, function () {
            //
        });
    }
})();