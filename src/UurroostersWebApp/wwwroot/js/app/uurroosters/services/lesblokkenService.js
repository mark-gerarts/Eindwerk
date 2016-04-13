(function () {
    "use strict";

    angular.module("uurroostersApp").service("lesblokkenService", lesblokkenService);

    function lesblokkenService(baseHttpService, $http) {
        var lesblokkenService = function () {
            baseHttpService.constructor.call(this, $http);
            this.url = "api/lesblokken/";
        }
        lesblokkenService.prototype = Object.create(baseHttpService.constructor);

        return new lesblokkenService();
    }
})();