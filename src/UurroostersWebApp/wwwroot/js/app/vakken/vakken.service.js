(function () {
    "use strict";

    angular.module("vakkenApp").service("vakkenService", vakkenService);

    function vakkenService(baseHttpService, $http) {
        var vakkenService = function () {
            baseHttpService.constructor.call(this, $http);
            this.url = "api/vakken/";
        }
        vakkenService.prototype = Object.create(baseHttpService.constructor);

        return new vakkenService();
    }
})();