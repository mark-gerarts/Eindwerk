(function () {
    "use strict";
    
    angular.module("uurroostersApp").controller("uurroostersPreviewCtrl", uurroostersPreviewCtrl);

    function uurroostersPreviewCtrl(timeConverter, lessenService, $routeParams) {
        var vm = this;
        
        vm.lessen = [];
        vm.currentKlas = {
            Id: $routeParams.klasID
        };

        lessenService.getLessenByKlasID($routeParams.klasID).then(function (r) {
            angular.copy(r.data, vm.lessen);
        });
        

        vm.tijdstippen = [
            "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
        ];

        vm.convertTime = function (time) {
            return timeConverter.stringToPx(time)
        }

        vm.getLength = function (les) {
            var startpx = vm.convertTime(les.Starttijdstip);
            var eindpx = vm.convertTime(les.Eindtijdstip);
            return eindpx - startpx;
        }

        vm.getStyle = function (les) {
            var length = vm.getLength(les);
            var start = vm.convertTime(les.Starttijdstip);

            return {
                "margin-top": start + "px", 
                "height": length + "px"
            }
        }
    }
})();