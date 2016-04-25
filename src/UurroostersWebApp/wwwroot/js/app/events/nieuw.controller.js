(function () {
    "use strict";

    angular.module("eventsApp").controller("eventsNieuwCtrl", eventsNieuwCtrl);

    function eventsNieuwCtrl($q, klassenService, campussenService) {
        var vm = this;
        
        vm.isLoading = true;
        vm.klassen = [];

        vm.init = function () {
            vm.isLoading = true;

            function getData(service) {
                var defer = $q.defer();
                service.async().then(function (r) {
                    defer.resolve(service.getAll());
                });
                return defer.promise;
            }
            $q.all([
                getData(klassenService),
                //getData(lesblokkenService),
                //getData(leerkrachtenService),
                //getData(vakkenService),
                //getData(dagenService),
                getData(campussenService)
            ]).then(function (data) {
                angular.copy(data[0], vm.klassen);
                angular.copy(data[1], vm.campussen);

                //vm.currentKlas = klassenService.findById($routeParams.klasID);
                //vm.initialiseNieuweLes();

                vm.isLoading = false;
            })
        }
        vm.init();
    }
})();