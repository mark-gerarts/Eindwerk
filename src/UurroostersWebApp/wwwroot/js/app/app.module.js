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
            controller: "homeController",
            controllerAs: "vm",
            templateUrl: "js/app/home/views/index.html"
        });

        //Leerkrachten
        $routeProvider.when("/leerkrachten", {
            controller: "leerkrachtenController",
            controllerAs: "vm",
            templateUrl: "js/app/leerkrachten/views/index.html"
        });
    });
})();