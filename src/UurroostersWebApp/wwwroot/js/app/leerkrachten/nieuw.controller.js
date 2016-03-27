(function () {
    "use strict";

    angular.module("leerkrachtenApp").controller("nieuweLeerkrachtenCtrl", nieuweLeerkrachtenCtrl);

    function nieuweLeerkrachtenCtrl() {
        var vm = this;

        vm.isBusy = false;
        vm.success = false;
        vm.errorMessage = "";

        vm.nieuweLeerkracht = {};

    }
})();