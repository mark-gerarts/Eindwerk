(function () {
    "use strict";

    angular.module("klassenApp").controller("nieuweKlasCtrl", nieuweKlasCtrl);

    function nieuweKlasCtrl($controller, klassenService, campussenService, studierichtingenService, klassenMapper) {
        var vm = this;

        angular.extend(vm, $controller("baseNieuwCtrl", {
            vm: this,
            myService: klassenService,
            entityName: "Klas",
            entityPlural: "Klassen",
            myMapper: klassenMapper
        }));

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