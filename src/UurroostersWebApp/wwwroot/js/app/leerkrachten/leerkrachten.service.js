(function () {
    "use strict";

    angular.module("leerkrachtenApp").service("leerkrachtenService", leerkrachtenService);

    function leerkrachtenService($http) {
        var self = this;
        this.leerkrachten = [];

        $http.get("api/leerkrachten").then(function (r) {
            angular.copy(r.data, self.leerkrachten);
            console.log(r);
        }, function (e) {
            console.log(e);
        });

        this.getLeerkrachten = function() {
            return this.leerkrachten;
        }
    }
})();