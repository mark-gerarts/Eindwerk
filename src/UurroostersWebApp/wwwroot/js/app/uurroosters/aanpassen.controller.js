(function () {
    "use strict";

    angular.module("uurroostersApp").controller("uurroostersAanpassenCtrl", uurroostersAanpassenCtrl);

    function uurroostersAanpassenCtrl() {
        var vm = this;

        //ToDo: routeparams
        vm.currentKlas = {
            Id: 1
        }
    }
})();