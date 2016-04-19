(function () {
    "use strict";

    angular.module("uurroostersApp").service("lessenService", lessenService);

    function lessenService($http) {
        this.lessen = [];
        this.promise;

        this.getUurrooster = function (klasID, startdag) {
            return $http.get("api/uurroosters/" + klasID + "/" + startdag);
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