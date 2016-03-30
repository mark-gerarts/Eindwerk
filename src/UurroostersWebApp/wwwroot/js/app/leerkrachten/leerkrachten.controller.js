(function () {
    "use strict";

    angular.module("leerkrachtenApp").controller("leerkrachtenCtrl", leerkrachtenCtrl);

    function leerkrachtenCtrl(leerkrachtenService, vakkenService, $location) {
        var vm = this;
        
        vm.leerkrachten = [];
        vm.isLoading = true;

        vm.vakken = [];

        leerkrachtenService.async().then(function (r) {
            vm.leerkrachten = leerkrachtenService.getAll();
        }, function (e) {
            console.log(e);
        }).finally(function () {
            vm.isLoading = false;
        });

        vakkenService.async().then(function (r) {
            vm.vakken = vakkenService.getAll();
        }, function () {
            //
        });

        vm.showDetails = function (leerkracht) {
            $location.path("/leerkrachten/details/" + leerkracht.Id);
        };
    }
})();