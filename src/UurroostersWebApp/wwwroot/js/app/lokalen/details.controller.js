(function () {
    "use strict";

    angular.module("lokalenApp").controller("lokalenDetailsCtrl", lokalenDetailsCtrl);

    function lokalenDetailsCtrl($controller, lokalenService, campussenService, $routeParams) {
        var vm = this;

        angular.extend(vm, $controller("baseDetailsCtrl", {
            vm: this,
            $routeParams: $routeParams,
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

        vm.init();
    }
})();