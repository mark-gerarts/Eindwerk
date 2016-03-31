(function () {
    "use strict";

    angular.module("leerkrachtenApp").controller("leerkrachtenDetailsCtrl", leerkrachtenDetailsCtrl);

    function leerkrachtenDetailsCtrl(leerkrachtenService, vakkenService, $routeParams) {
        var vm = this;

        vm.currentLeerkracht = {};
        vm.updatedLeerkracht = {};
        vm.notFound = false;
        vm.deleting = false;
        vm.isDeleted = false;
        vm.updating = false;

        vm.vakken = [];
        
        leerkrachtenService.async().then(function (r) {
            vm.currentLeerkracht = leerkrachtenService.findById($routeParams.id);
            vm.updatedLeerkracht = angular.copy(vm.currentLeerkracht);
            if (!vm.currentLeerkracht) {
                vm.notFound = true;
            }
        }, function (e) {
            
        });

        vakkenService.async().then(function (r) {
            vm.vakken = vakkenService.getAll();
        }, function (e) {

        });

        vm.deleteLeerkracht = function () {
            vm.deleting = true;

            leerkrachtenService.delete(vm.currentLeerkracht.Id).then(function (r) {
                vm.isDeleted = true;
                vm.currentLeerkracht = {};
            }, function (error) {
                vm.errorMessage = "Er is een fout opgetreden.";
            }).finally(function () {
                vm.deleting = false;
            });
        }

        vm.updateLeerkracht = function () {
            vm.updating = true;

            leerkrachtenService.update(vm.updatedLeerkracht).then(function (r) {
                vm.currentLeerkracht = angular.copy(vm.updatedLeerkracht);
            }, function (e) {
                //
            }).finally(function () {
                vm.updating = false;
            });
        }
    }
})();