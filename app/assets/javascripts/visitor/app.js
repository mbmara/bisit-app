(function(){
	'use strict';
	angular
		.module('admDashboard')
		.config(['$stateProvider',routes]);

		function routes($stateProvider){
			

	   	 	$stateProvider
	   	 	.state("index.visitors",{
	          	url:"visitors",
	          	controller:'visitorController',
	          	templateUrl:"visitor/view.html"
	      	})
	      
		}
})();