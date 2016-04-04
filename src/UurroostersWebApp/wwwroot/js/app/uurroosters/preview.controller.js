(function () {
    "use strict";
    
    angular.module("uurroostersApp").controller("uurroostersPreviewCtrl", uurroostersPreviewCtrl);

    function uurroostersPreviewCtrl(timeConverter) {
        var vm = this;

        vm.currentKlas = {
            Id: 1
        }

        //Komt uit DB
        vm.dagen = [
            {
                "Id": 1, "Naam": "Maandag", "Lessen": [
                    {"Naam": "Wiskunde", "Starttijdstip": "08:20:00", "Eindtijdstip": "09:10:00"}
                ]
            },
            { "Id": 1, "Naam": "Dinsdag", "Lessen": [] },
            { "Id": 1, "Naam": "Woensdag", "Lessen": [] },
            { "Id": 1, "Naam": "Donderdag", "Lessen": [] },
            { "Id": 1, "Naam": "Vrijdag", "Lessen": [] },
        ];

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