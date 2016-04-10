(function () {
    "use strict";

    angular.module("uurroostersApp").service("uurroostersService", uurroostersService);

    function uurroostersService($http, $q) {
        this.lesblokken = [];
        this.dagen = [];
        
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
                    getData("dagen")
                ]).then(function (data) {
                    console.log(data)
                    angular.copy(data[0], self.lesblokken);
                    angular.copy(data[1], self.dagen);
                })
            }
            return self.promise;
        }

        this.getAllLesblokken = function () {
            return this.lesblokken;
        }

        this.getAllDagen = function () {
            return this.dagen;
        }

    }
})();