(function () {
    "use strict";

    angular.module("leerkrachtenApp").controller("leerkrachtenDetailsCtrl", leerkrachtenDetailsCtrl);

    function leerkrachtenDetailsCtrl(leerkrachtenService, $routeParams) {
        var vm = this;

        vm.currentLeerkracht = {};
        vm.notFound = false;
        vm.isBusy = false;
        vm.isDeleted = false;
        
        leerkrachtenService.async().then(function (r) {
            vm.currentLeerkracht = leerkrachtenService.findById($routeParams.id);
            if (!vm.currentLeerkracht) {
                vm.notFound = true;
            }
        }, function (e) {
            
        });

        vm.deleteLeerkracht = function () {
            vm.isBusy = true;

            leerkrachtenService.delete(vm.currentLeerkracht.Id).then(function (r) {
                vm.isDeleted = true;
                vm.currentLeerkracht = {};
            }, function (error) {
                vm.errorMessage = "Er is een fout opgetreden.";
            }).finally(function () {
                vm.isBusy = false;
            });
        }
    }
})();