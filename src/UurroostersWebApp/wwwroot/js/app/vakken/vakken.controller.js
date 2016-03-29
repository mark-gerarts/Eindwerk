(function () {
    "use strict";

    angular.module("vakkenApp").controller("vakkenCtrl", vakkenCtrl);

    function vakkenCtrl(vakkenService, $location) {
        var vm = this;

        vm.vakken = [];
        vm.isLoading = true;

        vakkenService.async().then(function (r) {
            vm.vakken = vakkenService.getAll();
        }, function (e) {
            console.log(e);
        }).finally(function () {
            vm.isLoading = false;
        });

        vm.showDetails = function (vak) {
            $location.path("/vakken/details/" + vak.Id);
        };
    }
})();