(function () {
    "use strict";

    /**
     * 
     * Base Index Controller. Controllers die deze functies nodig hebben 
     * erven hiervan.
     * 
     */

    angular.module("app").controller("baseIndexCtrl", baseIndexCtrl);

    function baseIndexCtrl(vm, $location, myService, entityName, entityPlural) {
        // Worden in de views gebruikt.
        vm.EntityName = entityName;
        vm.entityName = entityName.toLowerCase();
        vm.EntityPlural = entityPlural;
        vm.entityPlural = entityPlural.toLowerCase();

        vm.entities = [];
        vm.isLoading = true;

        vm.init = function () {
            var vm = this;
            myService.async().then(function (r) {
                vm.entities = myService.getAll();
            }, function (e) {
                console.log(e);
            }).finally(function () {
                vm.isLoading = false;
            });
        }
        
        // Functie die ervoor zorgt dat een table row als een <a> werkt.
        vm.showDetails = function (entity) {
            $location.path("/" + vm.entityPlural + "/details/" + entity.Id);
        };

        // Partials includen.
        vm.includeOverview = function () {
            return 'js/app/' + vm.entityPlural + '/views/overview.html';
        }

        vm.includeSearchOptions = function () {
            return 'js/app/' + vm.entityPlural + '/views/searchoptions.html';
        }
    }
})();