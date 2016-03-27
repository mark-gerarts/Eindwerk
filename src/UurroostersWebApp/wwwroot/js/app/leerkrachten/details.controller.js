(function () {
    "use strict";

    angular.module("leerkrachtenApp").controller("leerkrachtenDetailsCtrl", leerkrachtenDetailsCtrl);

    function leerkrachtenDetailsCtrl(leerkrachtenService, $routeParams) {
        var vm = this;

        vm.currentLeerkracht = {};
        
        leerkrachtenService.async().then(function (r) {
            vm.currentLeerkracht = leerkrachtenService.findById($routeParams.id);
        }, function (e) {

        });
    }
})();