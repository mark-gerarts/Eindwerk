(function () {
    "use strict";

    angular.module("uurroostersApp").controller("uurroostersVerwijderenCtrl", uurroostersVerwijderenCtrl);

    function uurroostersVerwijderenCtrl() {
        var vm = this;

        vm.currentKlas = {
            Id: 1
        }
    }
})();