(function () {
    "use strict";

    angular.module("leerkrachtenApp").controller("leerkrachtenController", leerkrachtenController);

    function leerkrachtenController(leerkrachtenService) {
        var vm = this;

        vm.leerkrachten = leerkrachtenService.getLeerkrachten();
    }
})();