(function () {
    "use strict";

    angular.module("campussenApp").controller("campussenCtrl", campussenCtrl);

    function campussenCtrl($controller, campussenService, $location) {
        var vm = this;

        angular.extend(vm, $controller("baseIndexCtrl", {
            vm: this,
            $location: $location,
            myService: campussenService,
            entityName: "Campus",
            entityPlural: "Campussen"
        }));

        vm.init();

        vm.includeSearchOptions = function () {
            return "";
        }
    }
})();