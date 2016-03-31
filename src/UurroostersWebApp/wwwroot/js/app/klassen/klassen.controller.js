(function () {
    "use strict";

    angular.module("klassenApp").controller("klassenCtrl", klassenCtrl);

    function klassenCtrl(klassenService, campussenService, studierichtingenService, $location) {
        var vm = this;
        
        vm.klassen = [];
        vm.isLoading = true;

        vm.campussen = [];
        vm.studierichtingen = [];

        klassenService.async().then(function (r) {
            vm.klassen = klassenService.getAll();
        }, function (e) {
            console.log(e);
        }).finally(function () {
            vm.isLoading = false;
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

        vm.showDetails = function (klas) {
            $location.path("/klassen/details/" + klas.Id);
        };
    }
})();