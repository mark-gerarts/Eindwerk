(function () {
    "use strict";
    
    /**
     * 
     * Base HTTP Service. Omdat veel services dezelfde CRUD operaties uitvoeren, worden deze
     * hier gebundeld.
     * 
     */
    angular.module("app").service("baseHttpService", baseHttpService);

    function baseHttpService($http) {
        this.entities = [];
        this.promise;
        this.url;
        this.$http = $http;

        // Bij het erven kan er een custom mapper meegegeven worden die de
        // entity in het juiste formaat omzet.
        // Wordt er geen mapper meegegeven, dan zorgt dit object ervoor dat
        // de gewone models gebruikt worden.
        this.mapper = {
            insertViewModel: function (model) {
                return model;
            },
            updateViewModel: function (model) {
                return model;
            }
        };

        // Functie die ervoor zorgt dat de data enkel opgehaald wordt wanneer
        // dit effectief nodig is.
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

            var insertVM = self.mapper.insertViewModel(entity);
            return $http.post(self.url, insertVM).then(function (r) {
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

            var updateVM = self.mapper.updateViewModel(entity);
            return $http.put(self.url, updateVM).then(function (r) {
                if (r.status == 200) {
                    var index = self.findIndexOf(entity.Id);
                    if (index) {
                        self.entities.splice(index, 1, entity);
                    }
                }
                console.log(r)
            }, function (e) {
                console.log(e)
            });
        }

        // Hulpfunctie om de index van een entity te vinden.
        this.findIndexOf = function (id) {
            var self = this;
            return self.entities.findIndex(function (entity) {
                return entity.Id == id;
            });
        }
    }
})();