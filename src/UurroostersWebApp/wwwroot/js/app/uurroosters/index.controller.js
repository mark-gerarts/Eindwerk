﻿(function () {
    "use strict";

    angular.module("uurroostersApp").controller("uurroostersIndexCtrl", uurroostersIndexCtrl);

    function uurroostersIndexCtrl($location, klassenService, campussenService, studierichtingenService) {
        var vm = this;

        vm.klassen = [];
        vm.campussen = [];
        vm.studierichtingenService = [];
        vm.isLoading = true;

        klassenService.async().then(function () {
            vm.klassen = klassenService.getAll();
            vm.isLoading = false;
        });

        campussenService.async().then(function () {
            vm.campussen = campussenService.getAll();
        });

        studierichtingenService.async().then(function () {
            vm.studierichtingen = studierichtingenService.getAll();
        });

        vm.selectKlas = function (klas) {
            $location.path("/uurroosters/" + klas.Id + "/aanpassen");
        }
    }
})();