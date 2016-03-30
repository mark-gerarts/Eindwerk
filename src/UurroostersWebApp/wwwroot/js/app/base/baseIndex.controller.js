(function () {
    "use strict";

    angular.module("app").controller("baseIndexCtrl", baseIndexCtrl);

    //Could Have
    function baseIndexCtrl(baseService, $location, entityName) {
        var vm = this;

        vm.entities = [];
        vm.isLoading = true;

        baseService.async().then(function (r) {
            vm.entities = baseService.getAll();
        }, function (e) {
            console.log(e);
        }).finally(function () {
            vm.isLoading = false;
        });

        vm.showDetails = function (entity) {
            $location.path("/" + entityName + "/details/" + entity.Id);
        };
    }
})();