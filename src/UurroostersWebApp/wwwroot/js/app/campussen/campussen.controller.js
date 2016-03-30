(function () {
    "use strict";

    angular.module("campussenApp").controller("campussenCtrl", campussenCtrl);

    function campussenCtrl(campussenService, $location) {
        var vm = this;

        vm.campussen = [];
        vm.isLoading = true;

        campussenService.async().then(function (r) {
            vm.campussen = campussenService.getAll();
        }, function (e) {
            console.log(e);
        }).finally(function () {
            vm.isLoading = false;
        });

        vm.showDetails = function (campus) {
            $location.path("/campussen/details/" + campus.Id);
        };
    }
})();