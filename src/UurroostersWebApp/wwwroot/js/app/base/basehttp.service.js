(function () {
    "use strict";
    
    angular.module("app").service("baseHttpService", baseHttpService);

    function baseHttpService($http) {
        this.entities = [];
        this.promise;
        this.url;
        this.$http = $http;

        this.setUrl = function (url) {
            this.url = url;
        }

        this.async = function () {
            var self = this;

            if (!self.promise) {
                self.promise = $http.get(self.url).then(function (r) {
                    //Succes
                    angular.copy(r.data, self.entities);
                }, function (e) {
                    //Failure
                });
            }
            return self.promise;
        }

        this.getAll = function () {
            return this.entities;
        }

        this.insert = function (entity) {
            var self = this;
            return $http.post(self.url, entity).then(function (r) {
                console.log(r)
                if (r.status == 200) {
                    entity.Id = r.data;
                    self.entities.push(entity);
                }
            }, function (error) {
                //Error
            });
        }

        this.findById = function (id) {
            var self = this;
            return self.entities.find(function (entity) {
                return entity.Id == id;
            });
        }

        this.delete = function (id) {
            var self = this;
            return $http.delete(self.url + id).then(function (r) {
                var index = self.findIndexOf(id);
                if (index) {
                    self.entities.splice(index, 1);
                }
            }, function (error) {
                console.log(error);
            });
        }

        this.update = function (entity) {
            var self = this;
            return $http.put(self.url, entity).then(function (r) {
                if (r.status == 200) {
                    var index = self.findIndexOf(entity.Id);
                    if (index) {
                        self.entities.splice(index, 1, entity);
                    }
                }
            }, function (e) {
                //
            });
        }

        this.findIndexOf = function (id) {
            var self = this;
            return self.entities.findIndex(function (entity) {
                return entity.Id == id;
            });
        }
    }
})();