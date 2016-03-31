(function () {
    "use strict";

    angular.module("app").controller("baseIndexCtrl", baseIndexCtrl);

    function baseIndexCtrl(vm, $location, myService, entityName, entityPlural) {
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
        
        vm.showDetails = function (entity) {
            $location.path("/" + vm.entityPlural + "/details/" + entity.Id);
        };

        vm.includeOverview = function () {
            return 'js/app/' + vm.entityPlural + '/views/overview.html';
        }

        vm.includeSearchOptions = function () {
            return 'js/app/' + vm.entityPlural + '/views/searchoptions.html';
        }
    }
})();