(function () {
    "use strict";

    angular.module("campussenApp").controller("campussenDetailsCtrl", campussenDetailsCtrl);

    function campussenDetailsCtrl(campussenService, $routeParams) {
        var vm = this;

        vm.currentCampus = {};
        vm.notFound = false;
        vm.deleting = false;
        vm.isDeleted = false;
        vm.updating = false;

        campussenService.async().then(function (r) {
            vm.currentCampus = campussenService.findById($routeParams.id);
            if (!vm.currentCampus) {
                vm.notFound = true;
            }
        }, function (e) {
            //
        });

        vm.deleteCampus = function () {
            vm.deleting = true;

            campussenService.delete(vm.currentCampus.Id).then(function (r) {
                vm.isDeleted = true;
                vm.currentCampus = {};
            }, function (error) {
                vm.errorMessage = "Er is een fout opgetreden.";
            }).finally(function () {
                vm.deleting = false;
            });
        }

        vm.updateCampus = function () {
            vm.updating = true;

            campussenService.update(vm.currentCampus).then(function () {
                //
            }, function () {
                //
            }).finally(function () {
                vm.updating = false;
            });
        }
    }
})();