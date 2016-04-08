(function () {
    "use strict";
    
    angular.module("uurroostersApp").controller("uurroostersPreviewCtrl", uurroostersPreviewCtrl);

    function uurroostersPreviewCtrl(timeConverter, lessenService, $routeParams) {
        var vm = this;
        
        vm.lessen = [];
        vm.currentKlas = {
            Id: $routeParams.klasID
        };

        vm.selectedLes = {};

        vm.dagen = [
            "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag"
        ];

        vm.tijdstippen = [
            "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
        ];

        lessenService.getLessenByKlasID($routeParams.klasID).then(function (r) {
            angular.copy(r.data, vm.lessen);
            vm.lessen.forEach(function (les) {
                les.bgColor = vm.generateColor();
            });
        });
        
        vm.convertTime = function (time) {
            return timeConverter.stringToPx(time)
        }

        vm.generateColor = function() {
            var mixColor = {
                r: 255,
                g: 255,
                b: 255
            }
            var randomColor = function() {
                return (Math.random() * 255);
            }
            var mix = function (c) {
                return Math.round((randomColor() + mixColor[c]) / 2)
            }

            var red = mix('r');
            var green = mix('g');
            var blue = mix('b');

            return "rgb(" + red + ", " + green + ", " + blue + ")";

        }
        
        vm.getStyle = function (les) {
            var start = vm.convertTime(les.Starttijd);
            var eind = vm.convertTime(les.Eindtijd);
                        
            return {
                "margin-top": start + "px", 
                "height": (eind - start) + "px",
                "background": les.bgColor
            }
        }

        vm.getFormattedTime = function (les) {
            return les.Starttijd + " - " + les.Eindtijd;
        }
    }
})();