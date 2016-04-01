(function () {
    "use strict";

    angular.module("klassenApp").controller("klassenCtrl", klassenCtrl);

    function klassenCtrl($controller, klassenService, campussenService, studierichtingenService, $location) {
        var vm = this;

        angular.extend(vm, $controller("baseIndexCtrl", {
            vm: this,
            $location: $location,
            myService: klassenService,
            entityName: "Klas",
            entityPlural: "Klassen"
        }));

        vm.init();

        vm.campusQuery;
        vm.campussen = [];
        campussenService.async().then(function (r) {
            vm.campussen = campussenService.getAll();
        }, function () {
            //
        });

        vm.srQuery;
        vm.studierichtingen = [];
        studierichtingenService.async().then(function (r) {
            vm.studierichtingen = studierichtingenService.getAll();
        }, function () {
            //
        });
    }
})();