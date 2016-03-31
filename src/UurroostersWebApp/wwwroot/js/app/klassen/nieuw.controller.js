(function () {
    "use strict";

    angular.module("klassenApp").controller("nieuweKlasCtrl", nieuweKlasCtrl);

    function nieuweKlasCtrl(klassenService, campussenService, studierichtingenService) {
        var vm = this;

        vm.isBusy = false;
        vm.success = false;
        vm.errorMessage = "";
        vm.isSubmittedOnce = false;

        vm.campussen = [];
        vm.studierichtingen = [];

        vm.nieuweKlas = {};

        campussenService.async().then(function (r) {
            vm.campussen = campussenService.getAll();
        }, function () {
            //
        });

        studierichtingenService.async().then(function (r) {
            vm.studierichtingen = studierichtingenService.getAll();
        }, function () {
            //
        });

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