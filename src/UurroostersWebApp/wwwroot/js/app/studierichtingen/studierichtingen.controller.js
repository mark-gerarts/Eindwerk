(function () {
    "use strict";

    angular.module("studierichtingenApp").controller("studierichtingenCtrl", studierichtingenCtrl);

    function studierichtingenCtrl(studierichtingenService, $location) {
        var vm = this;

        vm.studierichtingen = [];
        vm.isLoading = true;

        studierichtingenService.async().then(function (r) {
            vm.studierichtingen = studierichtingenService.getAll();
        }, function (e) {
            console.log(e);
        }).finally(function () {
            vm.isLoading = false;
        });

        vm.showDetails = function (studierichting) {
            $location.path("/studierichtingen/details/" + studierichting.Id);
        };
    }
})();