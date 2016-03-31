(function () {
    "use strict";

    angular.module("studierichtingenApp").controller("nieuweStudierichtingCtrl", nieuweStudierichtingCtrl);

    function nieuweStudierichtingCtrl(studierichtingenService) {
        var vm = this;

        vm.isBusy = false;
        vm.success = false;
        vm.errorMessage = "";
        vm.isSubmittedOnce = false;

        vm.nieuweStudierichtingen = {};

        vm.insertStudierichting = function () {
            vm.isBusy = true;
            vm.isSubmittedOnce = true;
            vm.success = false;

            studierichtingenService.insert(vm.nieuweStudierichting).then(function (r) {
                vm.success = true;
                vm.nieuweStudierichting = {};
            }, function (e) {
                //
            }).finally(function () {
                vm.isBusy = false;
            })
        }
    }
})();