(function () {
    "use strict";

    angular.module("uurroostersApp").controller("uurroostersAanpassenCtrl", uurroostersAanpassenCtrl);

    function uurroostersAanpassenCtrl($routeParams, uurroostersService, timeConverter) {
        var vm = this;

        vm.lesblokken = [];
        vm.dagen = [];
        vm.leerkrachten = [];
        vm.lokalen = [];
        vm.vakken = [];

        vm.currentKlas = {};
        vm.bevestigdeItems = {};
        vm.huidigItem = "";
        vm.nieuweLes = {};
                
        vm.tijdstippen = [
            "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
        ];
        vm.dagLabels = [
            "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag"
        ];

        vm.showDetails = false;
        vm.selectedLesblok = {};
        vm.selectLesblok = function (lesblok) {
            vm.showDetails = true;
            vm.selectedLesblok = lesblok;
        }

        vm.selectedDag = 0;
        vm.selectDag = function (direction) {
            var length = vm.dagen.length;
            switch (direction) {
                case "vorige":
                    vm.selectedDag--;
                    if (vm.selectedDag < 0) vm.selectedDag = length - 1;
                    break;
                case "volgende":
                    vm.selectedDag++;
                    if (vm.selectedDag > length - 1) vm.selectedDag = 0;
                    break;
            }
        }

        vm.convertTime = function (time) {
            return timeConverter.stringToPx(time)
        }

        vm.getStyle = function (les) {
            var start = vm.convertTime(les.Starttijd);
            var eind = vm.convertTime(les.Eindtijd);

            return {
                "margin-top": start + "px",
                "height": (eind - start) + "px"
            }
        }

        vm.bevestigItem = function (item) {
            switch (item) {
                case "vakken":
                    vm.bevestigdeItems.vakken = vm.nieuweLes.vak;
                    break;
                case "leerkrachten":
                    vm.bevestigdeItems.leerkrachten = vm.nieuweLes.leerkracht;
                    break;
                case "lokalen":
                    vm.bevestigdeItems.lokalen = vm.nieuweLes.lokaal;
                    break;
            }

            vm.huidigItem = '';
        }
        
        vm.initialiseNieuweLes = function () {
            vm.nieuweLes.vak = vm.vakken[0] || null;
            vm.nieuweLes.leerkracht = vm.leerkrachten[0] || null;
            vm.nieuweLes.lokaal = vm.lokalen[0] || null;
        }

        vm.init = function () {
            uurroostersService.async().then(function () {
                vm.lesblokken = uurroostersService.getAll("lesblokken");
                vm.dagen = uurroostersService.getAll("dagen");
                vm.leerkrachten = uurroostersService.getAll("leerkrachten");
                vm.lokalen = uurroostersService.getAll("lokalen");
                vm.vakken = uurroostersService.getAll("vakken");

                vm.currentKlas = uurroostersService.find("klassen", $routeParams.klasID);
                
                vm.initialiseNieuweLes();
            });
        }

        vm.init();

    }
})();