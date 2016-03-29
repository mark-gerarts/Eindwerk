(function () {
    "use strict";

    angular.module("vakkenApp").controller("vakkenDetailsCtrl", vakkenDetailsCtrl);

    function vakkenDetailsCtrl(vakkenService, $routeParams) {
        var vm = this;

        vm.currentVak = {};
        vm.notFound = false;
        vm.deleting = false;
        vm.isDeleted = false;
        vm.updating = false;

        vakkenService.async().then(function (r) {
            vm.currentVak = vakkenService.findById($routeParams.id);
            if (!vm.currentVak) {
                vm.notFound = true;
            }
        }, function (e) {
            //
        });

        vm.deleteVak = function () {
            vm.deleting = true;

            vakkenService.delete(vm.currentVak.Id).then(function (r) {
                vm.isDeleted = true;
                vm.currentVak = {};
            }, function (error) {
                vm.errorMessage = "Er is een fout opgetreden.";
            }).finally(function () {
                vm.deleting = false;
            });
        }

        vm.updateVak = function () {
            vm.updating = true;

            vakkenService.update(vm.currentVak).then(function () {
                //
            }, function () {
                //
            }).finally(function () {
                vm.updating = false;
            });
        }
    }
})();