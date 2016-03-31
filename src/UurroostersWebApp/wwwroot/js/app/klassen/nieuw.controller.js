(function () {
    "use strict";

    angular.module("klassenApp").controller("nieuweKlasCtrl", nieuweKlasCtrl);

    function nieuweKlasCtrl(klassenService) {
        var vm = this;

        vm.isBusy = false;
        vm.success = false;
        vm.errorMessage = "";
        vm.isSubmittedOnce = false;

        vm.nieuweKlas = {};

        vm.insertKlas = function () {
            vm.isBusy = true;
            vm.isSubmittedOnce = true;
            vm.success = false;

            klassenService.insert(vm.nieuweKlas).then(function (r) {
                vm.success = true;
                vm.nieuweKlas = {};
            }, function (e) {
                //
            }).finally(function () {
                vm.isBusy = false;
            })
        }
    }
})();