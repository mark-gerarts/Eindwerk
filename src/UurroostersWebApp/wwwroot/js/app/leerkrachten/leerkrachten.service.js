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
                    leerkracht.Id = r.data;
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

        this.delete = function (id) {
            return $http.delete("api/leerkrachten/" + id).then(function (r) {
                var index = self.findIndexOf(id); 
                if (index) {
                    self.leerkrachten.splice(index, 1);
                }
            }, function (error) {
                console.log(error);
            });
        }

        this.update = function (leerkracht) {
            return $http.put("api/leerkrachten", leerkracht).then(function (r) {
                if (r.status == 200) {
                    var index = self.findIndexOf(leerkracht.Id); 
                    if (index) {
                        self.leerkrachten.splice(index, 1, leerkracht);
                    }
                }
            }, function (e) {
                //
            });
        }

        this.findIndexOf = function (id) {
            return self.leerkrachten.findIndex(function (leerkracht) {
                return leerkracht.Id == id;
            });
        }
    }
})();