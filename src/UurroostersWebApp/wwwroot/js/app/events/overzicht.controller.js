(function () {
    "use strict";

    angular.module("eventsApp").controller("eventsOverzichtCtrl", eventsOverzichtCtrl);

    function eventsOverzichtCtrl($location, $q, eventsService, klassenService) {
        var vm = this;

        vm.isLoading = true;

        vm.events = [];
        vm.klassen = [];



        vm.showDetails = function (ev) {
            $location.path("/events/" + ev.Id);
        }

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
                getData(eventsService),
                getData(klassenService)
            ]).then(function (data) {
                angular.copy(data[0], vm.events);
                angular.copy(data[1], vm.klassen);
            }).finally(function () {
                vm.isLoading = false;
            });
        }
        vm.init();
    }
})();