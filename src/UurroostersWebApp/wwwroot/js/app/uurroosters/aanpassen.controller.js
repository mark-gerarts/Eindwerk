(function () {
    "use strict";

    angular.module("uurroostersApp").controller("uurroostersAanpassenCtrl", uurroostersAanpassenCtrl);

    function uurroostersAanpassenCtrl($routeParams, uurroostersService, timeConverter) {
        var vm = this;

        vm.lesblokken = [];
        vm.dagen = [];

        vm.currentKlas = {
            Id: $routeParams.klasID
        }
        vm.tijdstippen = [
            "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
        ];

        vm.showDetails = false;
        vm.selectedLesblok = {};
        vm.selectLesblok = function (lesblok) {
            vm.showDetails = true;
            vm.selectedLesblok = lesblok;
        }

        vm.dagLabels = [
            "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag"
        ];

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
        
        

        vm.init = function () {
            uurroostersService.async().then(function () {
                vm.lesblokken = uurroostersService.getAllLesblokken();
                vm.dagen = uurroostersService.getAllDagen();
            });
        }

        vm.init();

    }
})();