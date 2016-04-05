(function () {
    "use strict";

    angular.module("uurroostersApp").service("lessenService", lessenService);

    function lessenService($http) {
        this.lessen = [];
        this.promise;

        this.setUrl = function (url) {
            this.url = url;
        }

        this.getLessenByKlasID = function (klasID) {
            return $http.get("api/lessen/" + klasID);
        }


    }
})();