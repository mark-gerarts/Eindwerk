(function () {
    "use strict";

    angular.module("leerkrachtenApp").controller("nieuweLeerkrachtenCtrl", nieuweLeerkrachtenCtrl);

    function nieuweLeerkrachtenCtrl(leerkrachtenService, vakkenService) {
        var vm = this;

        vm.isBusy = false;
        vm.success = false;
        vm.errorMessage = "";
        vm.isSubmittedOnce = false;

        vm.nieuweLeerkracht = {};

        vm.vakken = [];

        vakkenService.async().then(function (r) {
            vm.vakken = vakkenService.getAll();
        }, function (e) {

        });

        vm.insertLeerkracht = function () {
            vm.isBusy = true;
            vm.isSubmittedOnce = true;
            vm.success = false;

            leerkrachtenService.insert(vm.nieuweLeerkracht).then(function (r) {
                vm.success = true;
                vm.nieuweLeerkracht = {};
            }, function (e) {
                //
            }).finally(function () {
                vm.isBusy = false;
            })
        }
    }
})();