(function () {
    "use strict";

    /**
     * 
     * Base Nieuw Controller. Controllers die deze functies nodig hebben
     * erven hiervan.
     * 
     */

    angular.module("app").controller("baseNieuwCtrl", baseNieuwCtrl);

    function baseNieuwCtrl(vm, myService, entityName, entityPlural) {
        // Worden in de views gebruikt
        vm.EntityName = entityName;
        vm.entityName = entityName.toLowerCase();
        vm.EntityPlural = entityPlural;
        vm.entityPlural = entityPlural.toLowerCase();

        vm.isBusy = false;
        vm.success = false;
        vm.errorMessage = "";
        vm.isSubmittedOnce = false;

        vm.nieuweEntity = {};
        
        vm.insertEntity = function () {
            vm.isBusy = true;
            vm.isSubmittedOnce = true;
            vm.success = false;

            myService.insert(vm.nieuweEntity).then(function (r) {
                vm.success = true;
                vm.nieuweEntity = {};
            }, function (e) {
                //
            }).finally(function () {
                vm.isBusy = false;
            })
        }

        // Partials includen.
        vm.includeInsertForm = function () {
            return 'js/app/' + vm.entityPlural + '/views/insertform.html';
        }
    }
})();