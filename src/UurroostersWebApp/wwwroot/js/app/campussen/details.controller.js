(function () {
    "use strict";

    angular.module("campussenApp").controller("campussenDetailsCtrl", campussenDetailsCtrl);

    function campussenDetailsCtrl($controller, campussenService, $routeParams) {
        var vm = this;

        angular.extend(vm, $controller("baseDetailsCtrl", {
            vm: this,
            $routeParams: $routeParams,
            myService: campussenService,
            entityName: "Campus",
            entityPlural: "Campussen"
        }));

        vm.init();
    }
})();