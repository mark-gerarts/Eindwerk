(function () {
    "use strict";

    angular.module("studierichtingenApp").controller("studierichtingenCtrl", studierichtingenCtrl);

    function studierichtingenCtrl($controller, studierichtingenService, $location) {
        var vm = this;

        angular.extend(vm, $controller("baseIndexCtrl", {
            vm: this,
            $location: $location,
            myService: studierichtingenService,
            entityName: "Studierichting",
            entityPlural: "Studierichtingen"
        }));

        vm.init();

        vm.includeSearchOptions = function () {
            return "";
        }
    }
})();