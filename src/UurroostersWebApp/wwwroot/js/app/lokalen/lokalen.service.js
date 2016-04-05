(function () {
    "use strict";

    angular.module("lokalenApp").service("lokalenService", lokalenService);

    function lokalenService(baseHttpService, $http, lokalenMapper) {
        var lokalenService = function () {
            baseHttpService.constructor.call(this, $http);
            this.url = "api/lokalen/";
            this.mapper = lokalenMapper;
        }
        lokalenService.prototype = Object.create(baseHttpService.constructor);

        return new lokalenService();
    }
})();