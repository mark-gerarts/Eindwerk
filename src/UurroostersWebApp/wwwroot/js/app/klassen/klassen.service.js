(function () {
    "use strict";

    angular.module("klassenApp").service("klassenService", klassenService);

    function klassenService(baseHttpService, $http, klassenMapper) {
        var klassenService = function () {
            baseHttpService.constructor.call(this, $http);
            this.url = "api/klassen/";
            this.mapper = klassenMapper;
        }
        klassenService.prototype = Object.create(baseHttpService.constructor);

        return new klassenService();
    }
})();