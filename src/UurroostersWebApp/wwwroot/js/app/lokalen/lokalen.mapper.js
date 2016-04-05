(function () {
    "use strict";

    angular.module("lokalenApp").factory("lokalenMapper", lokalenMapper);

    function lokalenMapper() {
        var mapper = {};

        mapper.insertViewModel = function (lokaal) {
            return {
                Naam: lokaal.Naam,
                CampusID: lokaal.Campus.Id
            };
        }

        mapper.updateViewModel = function (lokaal) {
            return {
                Id: lokaal.Id,
                Naam: lokaal.Naam,
                CampusID: lokaal.Campus.Id
            };
        }

        return mapper;
    }
})();