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

        this.insertLes = function (les) {
            console.log(les)
            return $http.post("api/lessen", les);
        }

        this.deleteLes = function (id) {
            return $http.delete("api/lessen/" + id);
        }
    }
})();