﻿(function () {
    "use strict";

    angular.module("uurroostersApp").service("uurroostersService", uurroostersService);

    function uurroostersService($http, $q) {
        this.lesblokken = [];
        this.dagen = [];
        this.leerkrachten = [];
        this.lokalen = [];
        this.klassen = [];
        this.vakken = [];
        
        this.promise;
        
        this.async = function () {
            var self = this;

            function getData(type) {
                var defer = $q.defer();
                $http.get("api/" + type).then(function (r) {
                    defer.resolve(r.data);
                });
                return defer.promise;
            }

            if (!self.promise) {
                self.promise = $q.all([
                    getData("lesblokken"),
                    getData("dagen"),
                    getData("leerkrachten"),
                    getData("lokalen"),
                    getData("klassen"),
                    getData("vakken")
                ]).then(function (data) {
                    console.log(data)
                    angular.copy(data[0], self.lesblokken);
                    angular.copy(data[1], self.dagen);
                    angular.copy(data[2], self.leerkrachten);
                    angular.copy(data[3], self.lokalen);
                    angular.copy(data[4], self.klassen);
                    angular.copy(data[5], self.vakken);
                })
            }
            return self.promise;
        }

        this.getAll = function (type) {
            return this[type];
        }

        this.find = function (type, id) {
            var self = this;
            var index = -1;
            index = self[type].findIndex(function (element) {
                return element.Id == id;
            });
            if(index > -1) {
                return self[type][index];
            }
        }
    }
})();