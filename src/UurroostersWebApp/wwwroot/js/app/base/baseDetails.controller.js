(function () {
    "use strict";

    /**
     * 
     * Base Details controller. Bevat alle logica die herhaalt wordt door de 
     * verschillende controllers die hiervan erven.
     *  
     */

    angular.module("app").controller("baseDetailsCtrl", baseDetailsCtrl);

    function baseDetailsCtrl(vm, $routeParams, myService, entityName, entityPlural) {
        // Worden in de views gebruikt .
        vm.EntityName = entityName;
        vm.entityName = entityName.toLowerCase();
        vm.EntityPlural = entityPlural;
        vm.entityPlural = entityPlural.toLowerCase();

        vm.currentEntity = {};
        vm.updatedEntity = {};
        vm.notFound = false;
        vm.deleting = false;
        vm.isDeleted = false;
        vm.updating = false;

        vm.init = function () {
            // Haalt de huidige entity op adhv het ID in de URI.
            myService.async().then(function (r) {
                vm.currentEntity = myService.findById($routeParams.id);
                vm.updatedEntity = angular.copy(vm.currentEntity);
                if (!vm.currentEntity) {
                    vm.notFound = true;
                }
            }, function (e) {
                //
            });
        }
        
        vm.deleteEntity = function () {
            vm.deleting = true;

            myService.delete(vm.currentEntity.Id).then(function (r) {
                vm.isDeleted = true;
                vm.currentEntity = {};
            }, function (error) {
                vm.errorMessage = "Er is een fout opgetreden.";
            }).finally(function () {
                vm.deleting = false;
            });
        }

        vm.updateEntity = function () {
            vm.updating = true;

            myService.update(vm.updatedEntity).then(function () {
                vm.currentEntity = angular.copy(vm.updatedEntity);
            }, function () {
                //
            }).finally(function () {
                vm.updating = false;
            });
        }

        // Functies om de partials op te halen in ngInclude.
        vm.includeDetails = function () {
            return 'js/app/' + vm.entityPlural + '/views/details.html';
        }

        vm.includeUpdateForm = function () {
            return 'js/app/' + vm.entityPlural + '/views/updateform.html';
        }
    }
})();