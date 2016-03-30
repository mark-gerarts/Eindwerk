(function () {
    "use strict";

    angular.module("campussenApp").service("campussenService", campussenService);

    function campussenService(baseHttpService, $http) {
        var campussenService = function () {
            baseHttpService.constructor.call(this, $http);
            this.url = "api/campussen/";
        }
        campussenService.prototype = Object.create(baseHttpService.constructor);

        return new campussenService();
    }
})();