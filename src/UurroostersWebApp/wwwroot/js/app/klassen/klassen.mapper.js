(function () {
    "use strict";

    angular.module("klassenApp").factory("klassenMapper", klassenMapper);

    function klassenMapper() {
        var mapper = {};

        mapper.insertViewModel = function (klas) {
            return {
                Naam: klas.Naam,
                Leerjaar: klas.Leerjaar,
                CampusID: klas.Campus.Id,
                StudierichtingID: klas.Studierichting.Id
            };
        }

        return mapper;


    }
})();