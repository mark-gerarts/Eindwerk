(function () {
    "use strict";

    angular.module("studierichtingenApp").controller("studierichtingenDetailsCtrl", studierichtingenDetailsCtrl);

    function studierichtingenDetailsCtrl($controller, studierichtingenService, $routeParams) {
        var vm = this;

        angular.extend(vm, $controller("baseDetailsCtrl", {
            vm: this,
            $routeParams: $routeParams,
            myService: studierichtingenService,
            entityName: "Studierichting",
            entityPlural: "Studierichtingen"
        }));

        vm.init();
    }
})();