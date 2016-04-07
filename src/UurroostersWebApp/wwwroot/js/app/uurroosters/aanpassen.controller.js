(function () {
    "use strict";

    angular.module("uurroostersApp").controller("uurroostersAanpassenCtrl", uurroostersAanpassenCtrl);

    function uurroostersAanpassenCtrl($routeParams) {
        var vm = this;

        vm.currentKlas = {
            Id: $routeParams.klasID
        }


    }
})();