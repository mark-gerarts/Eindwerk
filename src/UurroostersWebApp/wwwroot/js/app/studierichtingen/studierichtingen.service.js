(function () {
    "use strict";

    angular.module("studierichtingenApp").service("studierichtingenService", studierichtingenService);

    function studierichtingenService(baseHttpService, $http) {
        var studierichtingenService = function () {
            baseHttpService.constructor.call(this, $http);
            this.url = "api/studierichtingen/";
        }
        studierichtingenService.prototype = Object.create(baseHttpService.constructor);

        return new studierichtingenService();
    }
})();