(function () {
    "use strict";

    angular.module("leerkrachtenApp").service("leerkrachtenService", leerkrachtenService);

    function leerkrachtenService($http) {
        var self = this;
        this.leerkrachten = [];
        this.promise;

        this.async = function () {
            if (!self.promise) {
                self.promise = $http.get("api/leerkrachten").then(function (r) {
                    //Succes
                    angular.copy(r.data, self.leerkrachten);
                }, function (e) {
                    //Failure
                });
            }
            return self.promise;
        }

        this.getAll = function () {
            return self.leerkrachten;
        }

        this.insert = function (leerkracht) {
            return $http.post("api/leerkrachten", leerkracht).then(function (r) {
                console.log(r)
                if (r.status == 200) {
                    leerkracht.id = r.data;
                    self.leerkrachten.push(leerkracht);
                }
            }, function (error) {
                //Error
            });
        }

        this.findById = function (id) {
            return self.leerkrachten.find(function (leerkracht) {
                return leerkracht.Id == id;
            });
        }
    }
})();