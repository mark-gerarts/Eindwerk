(function () {
    "use strict";

    angular.module("lokalenApp").service("lokalenService", lokalenService);

    function lokalenService(baseHttpService, $http) {
        var lokalenService = function () {
            baseHttpService.constructor.call(this, $http);
            this.url = "api/lokalen/";
        }
        lokalenService.prototype = Object.create(baseHttpService.constructor);

        return new lokalenService();
    }
})();