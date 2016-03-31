(function () {
    "use strict";

    angular.module("studierichtingenApp").controller("nieuweStudierichtingCtrl", nieuweStudierichtingCtrl);

    function nieuweStudierichtingCtrl($controller, studierichtingenService) {
        var vm = this;

        angular.extend(vm, $controller("baseNieuwCtrl", {
            vm: this,
            myService: studierichtingenService,
            entityName: "Studierichting",
            entityPlural: "Studierichtingen"
        }));
    }
})();