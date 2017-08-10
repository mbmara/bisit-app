(function(){
	'use strict';
	angular
		.module('admDashboard')
		.config(['$stateProvider',routes]);

		function routes($stateProvider){
			
			$stateProvider
				.state("visitor",{
					url:"/visitor",
					controller:'visitorController',
					templateUrl:"visitor/view.html",
					controllerAs:'visitMain'
				})
	      
		}
})();