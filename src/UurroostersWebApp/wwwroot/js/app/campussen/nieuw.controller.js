(function () {
    "use strict";

    angular.module("campussenApp").controller("nieuweCampusCtrl", nieuweCampusCtrl);

    function nieuweCampusCtrl($controller, campussenService) {
        var vm = this;

        angular.extend(vm, $controller("baseNieuwCtrl", {
            vm: this,
            myService: campussenService,
            entityName: "Campus",
            entityPlural: "Campussen"
        }));
    }
})();