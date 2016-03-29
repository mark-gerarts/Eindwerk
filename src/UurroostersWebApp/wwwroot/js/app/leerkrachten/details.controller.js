(function () {
    "use strict";

    angular.module("leerkrachtenApp").controller("leerkrachtenDetailsCtrl", leerkrachtenDetailsCtrl);

    function leerkrachtenDetailsCtrl(leerkrachtenService, $routeParams) {
        var vm = this;

        vm.currentLeerkracht = {};
        vm.updatedLeerkracht = {};
        vm.notFound = false;
        vm.deleting = false;
        vm.isDeleted = false;
        vm.updating = false;
        
        leerkrachtenService.async().then(function (r) {
            vm.currentLeerkracht = leerkrachtenService.findById($routeParams.id);
            if (!vm.currentLeerkracht) {
                vm.notFound = true;
            }
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

            leerkrachtenService.update(vm.updatedLeerkracht).then(function () {
                //
            }, function () {
                //
            }).finally(function () {
                vm.updating = false;
            });
        }
    }
})();