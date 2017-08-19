(function(){
	'use strict';
	angular
		.module('admDashboard')
		.config(['$stateProvider',routes]);

		function routes($stateProvider){

	   	 	$stateProvider
	   	 	.state("index.facility",{
	          	url:"facility",
	          	controller:'facilityController',
	          	templateUrl:"facility/index/view.html",
	         	  controllerAs:'facility'
	      })

		}
})();
