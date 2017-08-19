(function(){
	'use strict';
	angular
		.module('admDashboard')
		.config(['$stateProvider',routes]);

		function routes($stateProvider){

			$stateProvider
				.state("kiosk",{
					url:"/kiosk",
					controller:'kioskController',
					templateUrl:"visitor_kiosk/view.html",
					controllerAs:'kiosk'
				})

		}
})();
