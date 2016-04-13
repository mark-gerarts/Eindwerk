(function () {
    "use strict";
    
    angular.module("uurroostersApp").service("timeConverter", timeConverter);

    function timeConverter() {
        this.stringToPx = function (timestring) {
            var calendarStartTime = 8;
            var hourLengthInPixels = 100;

            var splits = timestring.split(":");
            var hours = parseInt(splits[0]);
            var minutes = parseInt(splits[1]);

            hours -= calendarStartTime;

            return (hours * hourLengthInPixels) + (minutes * hourLengthInPixels / 60);
        }
    }
})();