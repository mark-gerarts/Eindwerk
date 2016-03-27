(function () {
    "use strict";

    angular.module("leerkrachtenApp").service("leerkrachtenService", leerkrachtenService);

    function leerkrachtenService($http) {
        var leerkrachten = [];
        var promise;
        var leerkrachtenService = {};

        leerkrachtenService.async = function () {
            if (!promise) {
                promise = $http.get("api/leerkrachten").then(function (r) {
                    //Succes
                    angular.copy(r.data, leerkrachten);
                }, function (e) {
                    //Failure
                });
            }
            return promise;
        }

        leerkrachtenService.getAll = function () {
            return leerkrachten;
        }

        return leerkrachtenService;
    }
})();