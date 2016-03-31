﻿(function () {
    "use strict";

    angular.module("app").controller("baseNieuwCtrl", baseNieuwCtrl);

    //Could Have
    function baseNieuwCtrl(vm, myService, entityName, entityPlural) {
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

        vm.includeInsertForm = function () {
            return 'js/app/' + vm.entityPlural + '/views/insertform.html';
        }
    }
})();