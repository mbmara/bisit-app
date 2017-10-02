(function(){
	'use strict';
	angular
		.module('admDashboard')
		.config(['$stateProvider',routes]);

		function routes($stateProvider){

			$stateProvider
				.state("index.report",{
					url:"report",
					controller:'visitorController',
					templateUrl:"visitor/index/view.html",
					controllerAs:'visitor'
				})

		}
})();
