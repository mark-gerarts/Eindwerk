(function () {
    "use strict";

    angular.module("vakkenApp").service("vakkenService", vakkenService);

    function vakkenService($http) {
        var self = this;
        this.vakken = [];
        this.promise;

        this.async = function () {
            if (!self.promise) {
                self.promise = $http.get("api/vakken").then(function (r) {
                    //Succes
                    angular.copy(r.data, self.vakken);
                }, function (e) {
                    //Failure
                });
            }
            return self.promise;
        }

        this.getAll = function () {
            return self.vakken;
        }

        this.insert = function (vak) {
            return $http.post("api/vakken", vak).then(function (r) {
                console.log(r)
                if (r.status == 200) {
                    vak.Id = r.data;
                    self.vakken.push(vak);
                }
            }, function (error) {
                //Error
            });
        }

        this.findById = function (id) {
            return self.vakken.find(function (vak) {
                return vak.Id == id;
            });
        }

        this.delete = function (id) {
            return $http.delete("api/vakken/" + id).then(function (r) {
                var index = self.findIndexOf(id);
                if (index) {
                    self.vakken.splice(index, 1);
                }
            }, function (error) {
                console.log(error);
            });
        }

        this.update = function (vak) {
            return $http.put("api/vakken", vak).then(function (r) {
                if (r.status == 200) {
                    var index = self.findIndexOf(vak.Id);
                    if (index) {
                        self.vak.splice(index, 1, vak);
                    }
                }
            }, function (e) {
                //
            });
        }

        this.findIndexOf = function (id) {
            return self.vakken.findIndex(function (vak) {
                return vak.Id == id;
            });
        }
    }
})();