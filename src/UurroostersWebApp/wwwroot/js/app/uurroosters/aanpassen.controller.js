(function () {
    "use strict";

    angular.module("uurroostersApp").controller("uurroostersAanpassenCtrl", uurroostersAanpassenCtrl);

    function uurroostersAanpassenCtrl(
        $routeParams,
        $q,
        timeConverter,
        klassenService,
        lokalenService,
        lesblokkenService,
        leerkrachtenService,
        vakkenService,
        lessenService,
        dagenService
    ) {
        var vm = this;

        vm.lesblokken = [];
        vm.dagen = [];
        vm.leerkrachten = [];
        vm.lokalen = [];
        vm.vakken = [];
        vm.lessen = [];

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
        vm.selectLesblok = function (lesblok) {
            vm.showDetails = true;
            vm.bevestigdeItems = {};
            vm.nieuweLes.Lesblok = lesblok;
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
                    vm.bevestigdeItems.vakken = vm.nieuweLes.Vak;
                    break;
                case "leerkrachten":
                    vm.bevestigdeItems.leerkrachten = vm.nieuweLes.Leerkracht;
                    break;
                case "lokalen":
                    vm.bevestigdeItems.lokalen = vm.nieuweLes.Lokaal;
                    break;
            }

            vm.huidigItem = '';
        }
        
        vm.initialiseNieuweLes = function () {
            vm.nieuweLes.Vak = vm.vakken[0] || null;
            vm.nieuweLes.Leerkracht = vm.leerkrachten[0] || null;
            vm.nieuweLes.Lokaal = vm.lokalen[0] || null;
            console.log(vm.nieuweLes)
        }

        vm.isIngepland = function (lb) {
            var les = vm.lessen.find((l) => l.Lesblok.Id == lb.Id);
            if (les && les.Dag.Naam == vm.dagLabels[vm.selectedDag]) return true;
            return false;
        }

        vm.displayLesInfo = function (lb) {
            var les = vm.lessen.find((l) => l.Lesblok.Id == lb.Id);
            if (les) {
                return les.Vak.Naam;
            }
        }

        vm.submitLes = function () {
            var les = {};
            les.jaar = 2016; // ToDo
            les.lesblokID = vm.nieuweLes.Lesblok.Id;
            les.dagID = vm.dagen.find((d) => d.Naam == vm.dagLabels[vm.selectedDag]).Id;
            les.leerkrachtID = vm.nieuweLes.Leerkracht.Id;
            les.lokaalID = vm.nieuweLes.Lokaal.Id;
            les.klasID = vm.currentKlas.Id;
            les.vakID = vm.nieuweLes.Vak.Id;
            console.log(les);
        }

        //Bundles all calls in a $q.all
        vm.init = function () {
            function getData(service) {
                var defer = $q.defer();
                service.async().then(function (r) {
                    defer.resolve(service.getAll());
                });
                return defer.promise;
            }
            function getLessen() {
                var defer = $q.defer();
                lessenService.getDetailedLessenByKlasID($routeParams.klasID).then(function (r) {
                    defer.resolve(r.data);
                });
                return defer.promise;
            }
            $q.all([
                getData(lokalenService),
                getData(klassenService),
                getData(lesblokkenService),
                getData(leerkrachtenService),
                getData(vakkenService),
                getData(dagenService),
                getLessen()
            ]).then(function (data) {
                angular.copy(data[0], vm.lokalen);
                angular.copy(data[1], vm.klassen);
                angular.copy(data[2], vm.lesblokken);
                angular.copy(data[3], vm.leerkrachten);
                angular.copy(data[4], vm.vakken);
                angular.copy(data[5], vm.dagen);
                angular.copy(data[6], vm.lessen);

                vm.currentKlas = klassenService.findById($routeParams.klasID);
                vm.initialiseNieuweLes();
            })
        }
        vm.init();

    }
})();