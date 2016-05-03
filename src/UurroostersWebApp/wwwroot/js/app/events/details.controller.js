(function () {
    "use strict";

    angular.module("eventsApp").controller("eventsDetailsCtrl", eventsDetailsCtrl);

    function eventsDetailsCtrl($q, $routeParams, $scope, klassenService, campussenService, eventsService) {
        var vm = this;

        vm.submitting = false;
        vm.deleting = false;
        vm.isDeleted = false;
        vm.notFound = false;
        vm.success = false;
        vm.isLoading = true;
        vm.klassen = [];
        vm.campussen = [];
        vm.campusCheckboxes = {};

        vm.currentEvent = {};

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

        vm.updateEvent = function () {
            vm.submitting = true;
            vm.success = false;

            eventsService.async().then(function () {
                eventsService.update(vm.currentEvent);
                vm.success = true;
            }).finally(function () {
                vm.submitting = false;
            });
        }

        vm.deleteEvent = function () {
            vm.deleting = true;

            eventsService.delete(vm.currentEvent.Id).then(function (r) {
                vm.isDeleted = true;
                vm.currentEntity = {};
            }, function (error) {
                vm.errorMessage = "Er is een fout opgetreden.";
            }).finally(function () {
                vm.deleting = false;
            });
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

            function getCurrentEvent() {
                var defer = $q.defer();
                eventsService.async().then(function (r) {
                    defer.resolve(eventsService.findById($routeParams.eventID));
                });
                return defer.promise;
            }

            $q.all([
                getData(klassenService),                
                getData(campussenService),
                getCurrentEvent()
            ]).then(function (data) {
                angular.copy(data[0], vm.klassen);
                angular.copy(data[1], vm.campussen);
                angular.copy(data[2], vm.currentEvent);

                if (!vm.currentEvent.Id) {
                    vm.notFound = true;
                }

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
                    vm.currentEvent.StartTijdstip = $("#startinput").val();
                });
            });

            $("#eindtijdstip").on("dp.change", function () {
                $scope.$apply(function () {
                    vm.currentEvent.EindTijdstip = $("#eindinput").val();
                });
            });
        });
    }
})();