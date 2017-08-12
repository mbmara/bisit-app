(function(){
	'use strict';
	angular
		.module('admDashboard')
		.config(['$stateProvider',routes]);

		function routes($stateProvider){
			
			$stateProvider
				.state("index.identification",{
					url:"identification",
					controller:'identificationController',
					templateUrl:"identification/index/view.html",
					controllerAs:'identification'
				})
				.state("index.identification.create",{
					url:"/create",
					controller:'identificationCreateController',
					templateUrl:"identification/create/view.html",
					controllerAs:'identificationCreate'
				})
	      
		}
})();