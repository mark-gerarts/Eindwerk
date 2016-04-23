(function () {
    "use strict";
    
    angular.module("uurroostersApp").controller("uurroostersPreviewCtrl", uurroostersPreviewCtrl);

    function uurroostersPreviewCtrl(timeConverter, lessenService, $routeParams) {
        var vm = this;
        
        vm.lessen = [];
        vm.events = [];

        vm.currentKlas = {
            Id: $routeParams.klasID
        };

        vm.currentDay = new Date();

        vm.startOfWeek = function (date) {
            var start = date || new Date();
            var currentDay = start.getDay();
            while (currentDay != 1) {
                start.setDate(start.getDate() - 1);
                currentDay = start.getDay();
            }
            return start;
        }
        //vm.startOfWeek = "20160418"; // ToDo

        vm.getShortDate = function (index) {
            var start = vm.startOfWeek(vm.currentDay);
            start.setDate(start.getDate() + index);
            return start.getDate() + "/" + (start.getMonth() + 1);
        }
        

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

        vm.getEventStyle = function (event) {
            var start = vm.convertTime(event.StartTijdstip);
            var einde = vm.convertTime(event.EindTijdstip);

            if (event.StartTijdstip == "08:00") {
                start = vm.convertTime("08:05");
            }
            if (event.EindTijdstip == "18:00") {
                einde = vm.convertTime("17:55");
            }

            return {
                "margin-top": start + "px", 
                "height": (einde - start) + "px"                
            };
        }

        vm.getFormattedTime = function (les) {
            return les.Starttijd + " - " + les.Eindtijd;
        }

        vm.dateTimeToTimeString = function(date) {
            return date.toTimeString().substring(0, 5);
        }

        vm.formatEvents = function () {
            vm.events.forEach(function (event) {
                var start = new Date(event.StartTijdstip);
                var eind = new Date(event.EindTijdstip);

                event.StartTijdstip = vm.dateTimeToTimeString(start);
                event.EindTijdstip = vm.dateTimeToTimeString(eind);

                //Temporary
                var dag = start.getDay() - 1;
                event.DagNaam = vm.dagen[dag];
            });
        }

        vm.formatDate = function(date) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();

            if(month < 10) month = "0" + month.toString();
            if(day < 10) day = "0" + day.toString();

            return year.toString() + month.toString() + day.toString();
        }

        vm.previousWeek = function () {
            var newDate = new Date();
            newDate.setDate(vm.currentDay.getDate() - 7);
            vm.currentDay = newDate;
            vm.loadWeek();
        }

        vm.nextWeek = function () {
            var newDate = new Date();
            newDate.setDate(vm.currentDay.getDate() + 7);
            vm.currentDay = newDate;
            vm.loadWeek();
        }

        vm.loadWeek = function (date) {
            vm.isLoading = true;

            date = date || vm.formatDate(vm.startOfWeek(vm.currentDay));
            console.log(date)
            lessenService.getUurrooster($routeParams.klasID, date).then(function (r) {
                angular.copy(r.data.lessen, vm.lessen);
                angular.copy(r.data.events, vm.events);                
                vm.formatEvents();
                console.log(vm.events)
                vm.generateColors(vm.lessen);
            }).finally(function () {
                vm.isLoading = false;
            });
        }
        vm.loadWeek();
    }
})();