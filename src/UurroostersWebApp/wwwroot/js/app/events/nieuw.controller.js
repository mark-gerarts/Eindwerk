(function () {
    "use strict";

    angular.module("eventsApp").controller("eventsNieuwCtrl", eventsNieuwCtrl);

    function eventsNieuwCtrl($q, $scope, klassenService, campussenService, eventsService) {
        var vm = this;
        
        vm.submitting = false;
        vm.isLoading = true;
        vm.klassen = [];
        vm.campussen = [];

        vm.nieuwEvent = {};

        vm.resetNieuwEvent = function () {
            vm.nieuwEvent = {
                Naam: "",
                Omschrijving: "",
                StartTijdstip: "",
                EindTijdstip: "",
                Klassen: []
            }
        }

        vm.insertEvent = function () {
            vm.submitting = true;

            eventsService.async().then(function () {
                eventsService.insert(vm.nieuwEvent);
                vm.resetNieuwEvent();
            }).finally(function () {
                vm.submitting = false;
            });
        }

        vm.init = function () {
            vm.isLoading = true;

            vm.resetNieuwEvent();

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

        $(function () {
            $('.datetimepicker').datetimepicker({
                locale: 'nl'
            });

            $("#starttijdstip").on("dp.change", function () {
                $scope.$apply(function () {
                    vm.nieuwEvent.StartTijdstip = $("#startinput").val();
                });                
            });

            $("#eindtijdstip").on("dp.change", function () {
                $scope.$apply(function () {
                    vm.nieuwEvent.EindTijdstip = $("#eindinput").val();
                });
            });
        });
    }
})();