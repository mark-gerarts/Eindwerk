(function () {
    "use strict";

    angular.module("eventsApp").controller("eventsNieuwCtrl", eventsNieuwCtrl);

    function eventsNieuwCtrl($q, $scope, klassenService, campussenService, eventsService) {
        var vm = this;
        
        vm.submitting = false;
        vm.success = false;
        vm.isLoading = true;
        vm.klassen = [];
        vm.campussen = [];
        vm.campusCheckboxes = {};

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

        vm.selectCampus = function (campus) {
            if (vm.campusCheckboxes[campus.Id]) {
                vm.klassen.forEach(function (klas) {
                    if (klas.Campus.Id == campus.Id) {
                        vm.nieuwEvent.Klassen.push(klas);
                    }
                });
            } else {
                var i = vm.nieuwEvent.Klassen.length - 1;
                while (i >= 0) {
                    if (vm.nieuwEvent.Klassen[i].Campus.Id == campus.Id) {
                        vm.nieuwEvent.Klassen.splice(i, 1);
                    }
                    i--;
                }
            }
        }

        vm.insertEvent = function () {
            vm.submitting = true;
            vm.success = false;

            eventsService.async().then(function () {
                eventsService.insert(vm.nieuwEvent);
                vm.success = true,
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