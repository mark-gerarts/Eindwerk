(function () {
    "use strict";

    angular.module("klassenApp").controller("klassenDetailsCtrl", klassenDetailsCtrl);

    function klassenDetailsCtrl(klassenService, campussenService, studierichtingenService, $routeParams) {
        var vm = this;

        vm.currentKlas = {};
        vm.updatedKlas = {};
        vm.notFound = false;
        vm.deleting = false;
        vm.isDeleted = false;
        vm.updating = false;

        vm.campussen = [];
        vm.studierichtingen = [];

        klassenService.async().then(function (r) {
            vm.currentKlas = klassenService.findById($routeParams.id);
            vm.updatedKlas = angular.copy(vm.currentKlas);
            if (!vm.currentKlas) {
                vm.notFound = true;
            }
        }, function (e) {
            
        });

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

        vm.deleteKlas = function () {
            vm.deleting = true;

            klassenService.delete(vm.currentKlas.Id).then(function (r) {
                vm.isDeleted = true;
                vm.currentKlas = {};
            }, function (error) {
                vm.errorMessage = "Er is een fout opgetreden.";
            }).finally(function () {
                vm.deleting = false;
            });
        }

        vm.updateKlas = function () {
            vm.updating = true;

            klassenService.update(vm.updatedKlas).then(function () {
                vm.currentKlas = angular.copy(vm.updatedKlas);
            }, function () {
                //
            }).finally(function () {
                vm.updating = false;
            });
        }
    }
})();