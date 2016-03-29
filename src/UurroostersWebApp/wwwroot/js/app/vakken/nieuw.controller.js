(function () {
    "use strict";

    angular.module("vakkenApp").controller("nieuwVakCtrl", nieuwVakCtrl);

    function nieuwVakCtrl(vakkenService) {
        var vm = this;

        vm.isBusy = false;
        vm.success = false;
        vm.errorMessage = "";
        vm.isSubmittedOnce = false;

        vm.nieuwVak = {};

        vm.insertVak = function () {
            vm.isBusy = true;
            vm.isSubmittedOnce = true;
            vm.success = false;

            vakkenService.insert(vm.nieuwVak).then(function (r) {
                vm.success = true;
                vm.nieuwVak = {};
            }, function (e) {
                //
            }).finally(function () {
                vm.isBusy = false;
            })
        }
    }
})();