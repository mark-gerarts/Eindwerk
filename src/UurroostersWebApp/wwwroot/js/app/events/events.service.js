(function () {
    "use strict";

    angular.module("eventsApp").service("eventsService", eventsService);

    function eventsService(baseHttpService, $http, eventsMapper) {
        var eventsService = function () {
            baseHttpService.constructor.call(this, $http);
            this.url = "api/events/";
            this.mapper = eventsMapper;
        }
        eventsService.prototype = Object.create(baseHttpService.constructor);

        return new eventsService();
    }
})();