(function () {
    "use strict";

    // Move to own files
    // De modules registreren.
    angular.module("leerkrachtenApp", []);
    angular.module("vakkenApp", []);
    angular.module("campussenApp", []);
    angular.module("studierichtingenApp", []);
    angular.module("klassenApp", []);
    angular.module("lokalenApp", []);
    angular.module("uurroostersApp", []);
    angular.module("eventsApp", []);

    // De main module.
    angular.module("app", [
        "ngRoute",
        "leerkrachtenApp",
        "vakkenApp",
        "campussenApp",
        "studierichtingenApp",
        "klassenApp",
        "lokalenApp",
        "uurroostersApp",
        "eventsApp"
    ]).config(function ($routeProvider) {
        // De gedeelde views' URLs
        var baseUrl = {
            index: 'js/app/base/views/index.html',
            details: 'js/app/base/views/details.html',
            nieuw: 'js/app/base/views/nieuw.html'
        };

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
            templateUrl: baseUrl.index
        });

        $routeProvider.when("/leerkrachten/nieuw", {
            controller: "nieuweLeerkrachtenCtrl",
            controllerAs: "vm",
            templateUrl: baseUrl.nieuw
        });

        $routeProvider.when("/leerkrachten/details/:id", {
            controller: "leerkrachtenDetailsCtrl",
            controllerAs: "vm",
            templateUrl: baseUrl.details
        });

        //Vakken
        $routeProvider.when("/vakken", {
            controller: "vakkenCtrl",
            controllerAs: "vm",
            templateUrl: baseUrl.index
        });

        $routeProvider.when("/vakken/nieuw", {
            controller: "nieuwVakCtrl",
            controllerAs: "vm",
            templateUrl: baseUrl.nieuw
        });

        $routeProvider.when("/vakken/details/:id", {
            controller: "vakkenDetailsCtrl",
            controllerAs: "vm",
            templateUrl: baseUrl.details
        });

        //Campussen
        $routeProvider.when("/campussen", {
            controller: "campussenCtrl",
            controllerAs: "vm",
            templateUrl: baseUrl.index
        });

        $routeProvider.when("/campussen/nieuw", {
            controller: "nieuweCampusCtrl",
            controllerAs: "vm",
            templateUrl: baseUrl.nieuw
        });

        $routeProvider.when("/campussen/details/:id", {
            controller: "campussenDetailsCtrl",
            controllerAs: "vm",
            templateUrl: baseUrl.details
        });

        //Studierichtingen
        $routeProvider.when("/studierichtingen", {
            controller: "studierichtingenCtrl",
            controllerAs: "vm",
            templateUrl: baseUrl.index
        });

        $routeProvider.when("/studierichtingen/nieuw", {
            controller: "nieuweStudierichtingCtrl",
            controllerAs: "vm",
            templateUrl: baseUrl.nieuw
        });

        $routeProvider.when("/studierichtingen/details/:id", {
            controller: "studierichtingenDetailsCtrl",
            controllerAs: "vm",
            templateUrl: baseUrl.details
        });

        //Klassen
        $routeProvider.when("/klassen", {
            controller: "klassenCtrl",
            controllerAs: "vm",
            templateUrl: baseUrl.index
        });

        $routeProvider.when("/klassen/nieuw", {
            controller: "nieuweKlasCtrl",
            controllerAs: "vm",
            templateUrl: baseUrl.nieuw
        });

        $routeProvider.when("/klassen/details/:id", {
            controller: "klassenDetailsCtrl",
            controllerAs: "vm",
            templateUrl: baseUrl.details
        });

        //Lokalen
        $routeProvider.when("/lokalen", {
            controller: "lokalenCtrl",
            controllerAs: "vm",
            templateUrl: baseUrl.index
        });

        $routeProvider.when("/lokalen/nieuw", {
            controller: "nieuwLokaalCtrl",
            controllerAs: "vm",
            templateUrl: baseUrl.nieuw
        });

        $routeProvider.when("/lokalen/details/:id", {
            controller: "lokalenDetailsCtrl",
            controllerAs: "vm",
            templateUrl: baseUrl.details
        });

        //Uurroosters
        $routeProvider.when('/uurroosters', {
            controller: 'uurroostersIndexCtrl',
            controllerAs: 'vm',
            templateUrl: 'js/app/uurroosters/views/index.html'
        });

        $routeProvider.when('/uurroosters/:klasID/aanpassen', {
            controller: 'uurroostersAanpassenCtrl',
            controllerAs: 'vm',
            templateUrl: 'js/app/uurroosters/views/aanpassen.html'
        });

        $routeProvider.when('/uurroosters/:klasID/preview', {
            controller: 'uurroostersPreviewCtrl',
            controllerAs: 'vm',
            templateUrl: 'js/app/uurroosters/views/preview.html'
        });

        $routeProvider.when('/uurroosters/:klasID/verwijderen', {
            controller: 'uurroostersVerwijderenCtrl',
            controllerAs: 'vm',
            templateUrl: 'js/app/uurroosters/views/verwijderen.html'
        });

        //Events
        $routeProvider.when('/events/nieuw', {
            controller: 'eventsNieuwCtrl',
            controllerAs: 'vm',
            templateUrl: 'js/app/events/views/nieuw.html'
        });
    });
})();