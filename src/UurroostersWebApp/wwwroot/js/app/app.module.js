(function () {
    "use strict";

    // Move to own files
    angular.module("leerkrachtenApp", []);
    angular.module("vakkenApp", []);
    angular.module("campussenApp", []);
    angular.module("studierichtingenApp", []);
    angular.module("klassenApp", []);

    angular.module("app", [
        "ngRoute",
        "leerkrachtenApp",
        "vakkenApp",
        "campussenApp",
        "studierichtingenApp",
        "klassenApp"
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

        //Vakken
        $routeProvider.when("/vakken", {
            controller: "vakkenCtrl",
            controllerAs: "vm",
            templateUrl: "js/app/vakken/views/index.html"
        });

        $routeProvider.when("/vakken/nieuw", {
            controller: "nieuwVakCtrl",
            controllerAs: "vm",
            templateUrl: "js/app/vakken/views/nieuw.html"
        });

        $routeProvider.when("/vakken/details/:id", {
            controller: "vakkenDetailsCtrl",
            controllerAs: "vm",
            templateUrl: "js/app/vakken/views/details.html"
        });

        //Campussen
        $routeProvider.when("/campussen", {
            controller: "campussenCtrl",
            controllerAs: "vm",
            templateUrl: "js/app/campussen/views/index.html"
        });

        $routeProvider.when("/campussen/nieuw", {
            controller: "nieuweCampusCtrl",
            controllerAs: "vm",
            templateUrl: "js/app/campussen/views/nieuw.html"
        });

        $routeProvider.when("/campussen/details/:id", {
            controller: "campussenDetailsCtrl",
            controllerAs: "vm",
            templateUrl: "js/app/campussen/views/details.html"
        });

        //Studierichtingen
        $routeProvider.when("/studierichtingen", {
            controller: "studierichtingenCtrl",
            controllerAs: "vm",
            templateUrl: "js/app/studierichtingen/views/index.html"
        });

        $routeProvider.when("/studierichtingen/nieuw", {
            controller: "nieuweStudierichtingCtrl",
            controllerAs: "vm",
            templateUrl: "js/app/studierichtingen/views/nieuw.html"
        });

        $routeProvider.when("/studierichtingen/details/:id", {
            controller: "studierichtingenDetailsCtrl",
            controllerAs: "vm",
            templateUrl: "js/app/studierichtingen/views/details.html"
        });

        //Leerkrachten
        $routeProvider.when("/klassen", {
            controller: "klassenCtrl",
            controllerAs: "vm",
            templateUrl: "js/app/klassen/views/index.html"
        });

        $routeProvider.when("/klassen/nieuw", {
            controller: "nieuweKlasCtrl",
            controllerAs: "vm",
            templateUrl: "js/app/klassen/views/nieuw.html"
        });

        $routeProvider.when("/klassen/details/:id", {
            controller: "klassenDetailsCtrl",
            controllerAs: "vm",
            templateUrl: "js/app/klassen/views/details.html"
        });
    });
})();