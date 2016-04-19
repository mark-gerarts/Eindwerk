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

        vm.colors = [
            '#59dbe0', //blauw
            '#f57f68', //rood
            '#87d288', //groen
            '#f8b552', //geel
            '#99B2DD', //lichtblauw
            '#A1C084', //groenish
            '#E05263', //roodish
            '#FBB735',
            '#E98931',
            '#EB403B',
            '#B32E37',
            '#6C2A6A',
            '#5C4399',
            '#274389',
            '#1F5EA8',
            '#227FB0',
            '#2AB0C5',
            '#39C0B3'
        ];

        lessenService.getLessenByKlasID($routeParams.klasID).then(function (r) {
            angular.copy(r.data, vm.lessen);
            vm.generateColors(vm.lessen);
        });

        vm.generateColors = function (lessen) {
            var usedColors = {};
            var currentColorIndex = 0;

            lessen.forEach(function (les) {
                if (usedColors[les.VakNaam] === undefined) {
                    usedColors[les.VakNaam] = vm.colors[currentColorIndex];
                    currentColorIndex = (currentColorIndex == vm.colors.length - 1) ? 0 : currentColorIndex + 1;
                }

                les.bgColor = usedColors[les.VakNaam];
            });
        }
        
        vm.convertTime = function (time) {
            return timeConverter.stringToPx(time)
        }

        vm.randomColor = function() {
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