(function () {
    "use strict";

    angular.module("leerkrachtenApp").factory("leerkrachtenMapper", leerkrachtenMapper);

    function leerkrachtenMapper() {
        var mapper = {};

        mapper.insertViewModel = function (leerkracht) {
            var insertvm = {
                Naam: leerkracht.Naam,
                Voornaam: leerkracht.Voornaam,
                Vakken: []
            };

            if (leerkracht.Vakken) {
                leerkracht.Vakken.forEach(function (vak) {
                    insertvm.Vakken.push(vak.Id);
                });
            } else {
                leerkracht.Vakken = [];
            }            

            return insertvm;
        }

        mapper.updateViewModel = function (leerkracht) {
            var updatevm = {
                Id: leerkracht.Id,
                Naam: leerkracht.Naam,
                Voornaam: leerkracht.Voornaam,
                Vakken: []
            };

            leerkracht.Vakken.forEach(function (vak) {
                updatevm.Vakken.push(vak.Id);
            });

            return updatevm;
        }

        return mapper;
    }
})();