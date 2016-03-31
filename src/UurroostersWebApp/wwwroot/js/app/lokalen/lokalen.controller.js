(function () {
    "use strict";

    angular.module("lokalenApp").controller("lokalenCtrl", lokalenCtrl);

    function lokalenCtrl($controller, $location, lokalenService, campussenService) {
        var vm = this;

        angular.extend(vm, $controller("baseIndexCtrl", {
            vm: this,
            $location: $location,
            myService: lokalenService,
            entityName: "Lokaal",
            entityPlural: "Lokalen"
        }));

        vm.campusQuery;
        vm.campussen = [];
        campussenService.async().then(function (r) {
            vm.campussen = campussenService.getAll();
        }, function () {
            //
        });

        vm.init();
    }
})();