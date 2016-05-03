(function () {
    "use strict";

    angular.module("eventsApp").factory("eventsMapper", eventsMapper);

    function eventsMapper() {
        var mapper = {};

        mapper.insertViewModel = function (event) {
            var insertvm = {
                Naam: event.Naam,
                Omschrijving: event.Omschrijving,
                StartTijdstip: event.StartTijdstip,
                EindTijdstip: event.EindTijdstip,
                Klassen: []
            };

            if (event.Klassen) {
                event.Klassen.forEach(function (klas) {
                    insertvm.Klassen.push(klas.Id);
                });
            }
            return insertvm;
        }

        mapper.updateViewModel = function (event) {
            var updatevm = mapper.insertViewModel(event);
            updatevm.Id = event.Id;
            return updatevm;
        }

        return mapper;
    }
})();