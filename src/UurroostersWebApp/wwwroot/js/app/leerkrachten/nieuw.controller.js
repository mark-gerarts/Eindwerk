(function () {
    "use strict";

    angular.module("leerkrachtenApp").controller("nieuweLeerkrachtenCtrl", nieuweLeerkrachtenCtrl);

    function nieuweLeerkrachtenCtrl(leerkrachtenService) {
        var vm = this;

        vm.isBusy = false;
        vm.success = false;
        vm.errorMessage = "";
        vm.isSubmittedOnce = false;

        vm.nieuweLeerkracht = {};

        vm.insertLeerkracht = function () {
            vm.isBusy = true;
            vm.isSubmittedOnce = true;

            leerkrachtenService.insert(vm.nieuweLeerkracht).then(function (r) {
                //
            }, function (e) {
                //
            }).finally(function () {
                vm.isBusy = false;
            })
        }
    }
})();