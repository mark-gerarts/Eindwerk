(function () {
	"use strict";

	angular.module("uurroostersApp").service("dagenService", dagenService);

	function dagenService(baseHttpService, $http) {
		var dagenService = function () {
			baseHttpService.constructor.call(this, $http);
			this.url = "api/dagen/";
		}
		dagenService.prototype = Object.create(baseHttpService.constructor);

		return new dagenService();
	}
})();