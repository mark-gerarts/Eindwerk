(function () {
    "use strict";

    angular.module("leerkrachtenApp").controller("leerkrachtenCtrl", leerkrachtenCtrl);

    function leerkrachtenCtrl(leerkrachtenService, $location) {
        var vm = this;

        vm.leerkrachten = [];
        vm.isLoading = true;

        leerkrachtenService.async().then(function (r) {
            vm.leerkrachten = leerkrachtenService.getAll();
        }, function (e) {
            console.log(e);
        }).finally(function () {
            vm.isLoading = false;
        });

        vm.showLeerkracht = function (leerkracht) {
            $location.path('#/leerkrachten/' + leerkracht.Id);
        };
    }
})();