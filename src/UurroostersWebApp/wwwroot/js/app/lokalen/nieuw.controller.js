(function () {
    "use strict";

    angular.module("lokalenApp").controller("nieuwLokaalCtrl", nieuwLokaalCtrl);

    function nieuwLokaalCtrl($controller, lokalenService, campussenService) {
        var vm = this;

        angular.extend(vm, $controller("baseNieuwCtrl", {
            vm: this,
            myService: lokalenService,
            entityName: "Lokaal",
            entityPlural: "Lokalen"
        }));

        vm.campussen = [];
        campussenService.async().then(function (r) {
            vm.campussen = campussenService.getAll();
        }, function () {
            //
        });
    }
})();