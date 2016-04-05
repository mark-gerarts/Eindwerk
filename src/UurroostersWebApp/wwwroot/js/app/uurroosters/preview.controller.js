(function () {
    "use strict";
    
    angular.module("uurroostersApp").controller("uurroostersPreviewCtrl", uurroostersPreviewCtrl);

    function uurroostersPreviewCtrl(timeConverter, lessenService, $routeParams) {
        var vm = this;
        
        vm.lessen = [];
        vm.currentKlas = {
            Id: $routeParams.klasID
        };

        vm.dagen = [
            "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag"
        ];

        vm.tijdstippen = [
            "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
        ];

        lessenService.getLessenByKlasID($routeParams.klasID).then(function (r) {
            angular.copy(r.data, vm.lessen);
        });
        
        vm.convertTime = function (time) {
            return timeConverter.stringToPx(time)
        }

        vm.getLength = function (lesblok) {
            var startpx = vm.convertTime(lesblok.Starttijd);
            var eindpx = vm.convertTime(lesblok.Eindtijd);
            return eindpx - startpx;
        }

        vm.getStyle = function (les) {
            console.log(les)
            var length = vm.getLength(les.Lesblok);
            var start = vm.convertTime(les.Lesblok.Starttijd);

            return {
                "margin-top": start + "px", 
                "height": length + "px"
            }
        }
    }
})();