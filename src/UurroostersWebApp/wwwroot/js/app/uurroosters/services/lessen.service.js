(function () {
    "use strict";

    angular.module("uurroostersApp").service("lessenService", lessenService);

    function lessenService($http) {
        this.lessen = [];
        this.promise;

        this.getLessenByKlasID = function (klasID) {
            return $http.get("api/lessen/" + klasID);
        }

        this.getDetailedLessenByKlasID = function (klasID) {
            return $http.get("api/lessen/" + klasID + "/uitgebreid");
        }


    }
})();