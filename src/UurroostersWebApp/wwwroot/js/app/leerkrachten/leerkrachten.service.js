(function () {
    "use strict";

    angular.module("leerkrachtenApp").service("leerkrachtenService", leerkrachtenService);

    function leerkrachtenService(baseHttpService, $http, leerkrachtenMapper) {
        var leerkrachtenService = function () {
            baseHttpService.constructor.call(this, $http);
            this.url = "api/leerkrachten/";
            this.mapper = leerkrachtenMapper;
        }
        leerkrachtenService.prototype = Object.create(baseHttpService.constructor);

        return new leerkrachtenService();
    }
})();