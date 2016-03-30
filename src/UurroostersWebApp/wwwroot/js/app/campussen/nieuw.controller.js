(function () {
    "use strict";

    angular.module("campussenApp").controller("nieuweCampusCtrl", nieuweCampusCtrl);

    function nieuweCampusCtrl(campussenService) {
        var vm = this;

        vm.isBusy = false;
        vm.success = false;
        vm.errorMessage = "";
        vm.isSubmittedOnce = false;

        vm.nieuweCampus = {};

        vm.insertCampus = function () {
            vm.isBusy = true;
            vm.isSubmittedOnce = true;
            vm.success = false;

            campussenService.insert(vm.nieuweCampus).then(function (r) {
                vm.success = true;
                vm.nieuweCampus = {};
            }, function (e) {
                //
            }).finally(function () {
                vm.isBusy = false;
            })
        }
    }
})();