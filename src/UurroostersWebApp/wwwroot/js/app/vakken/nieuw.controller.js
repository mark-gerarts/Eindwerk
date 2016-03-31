(function () {
    "use strict";

    angular.module("vakkenApp").controller("nieuwVakCtrl", nieuwVakCtrl);

    function nieuwVakCtrl($controller, vakkenService) {
        var vm = this;

        angular.extend(vm, $controller("baseNieuwCtrl", {
            vm: this,
            myService: vakkenService,
            entityName: "Vak",
            entityPlural: "Vakken"
        }));
    }
})();