(function () {
    "use strict";

    angular.module("studierichtingenApp").controller("studierichtingenDetailsCtrl", studierichtingenDetailsCtrl);

    function studierichtingenDetailsCtrl(studierichtingenService, $routeParams) {
        var vm = this;

        vm.currentStudierichting = {};
        vm.notFound = false;
        vm.deleting = false;
        vm.isDeleted = false;
        vm.updating = false;

        studierichtingenService.async().then(function (r) {
            vm.currentStudierichting = studierichtingenService.findById($routeParams.id);
            if (!vm.currentStudierichting) {
                vm.notFound = true;
            }
        }, function (e) {
            //
        });

        vm.deleteStudierichting = function () {
            vm.deleting = true;

            studierichtingenService.delete(vm.currentStudierichting.Id).then(function (r) {
                vm.isDeleted = true;
                vm.currentStudierichting = {};
            }, function (error) {
                vm.errorMessage = "Er is een fout opgetreden.";
            }).finally(function () {
                vm.deleting = false;
            });
        }

        vm.updateStudierichting = function () {
            vm.updating = true;

            studierichtingenService.update(vm.currentStudierichting).then(function () {
                //
            }, function () {
                //
            }).finally(function () {
                vm.updating = false;
            });
        }
    }
})();