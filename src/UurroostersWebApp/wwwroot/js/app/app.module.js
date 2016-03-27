(function () {
    "use strict";

    // Move to own files
    angular.module("leerkrachtenApp", []);

    angular.module("app", [
        "ngRoute",
        "leerkrachtenApp"
    ]).config(function ($routeProvider) {
        // Home
        $routeProvider.when("/", {
            controller: "homeCtrl",
            controllerAs: "vm",
            templateUrl: "js/app/home/views/index.html"
        });

        //Leerkrachten
        $routeProvider.when("/leerkrachten", {
            controller: "leerkrachtenCtrl",
            controllerAs: "vm",
            templateUrl: "js/app/leerkrachten/views/index.html"
        });

        $routeProvider.when("/leerkrachten/nieuw", {
            controller: "nieuweLeerkrachtenCtrl",
            controllerAs: "vm",
            templateUrl: "js/app/leerkrachten/views/nieuw.html"
        });

        $routeProvider.when("/leerkrachten/details/:id", {
            controller: "leerkrachtenDetailsCtrl",
            controllerAs: "vm",
            templateUrl: "js/app/leerkrachten/views/details.html"
        });
    });
})();