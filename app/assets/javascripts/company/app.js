(function(){
	'use strict';
	angular
		.module('admDashboard')
		.config(['$stateProvider',routes]);

		function routes($stateProvider){
			

	   	 	$stateProvider
	   	 	.state("index.company",{
	          	url:"companies",
	          	controller:'companyController',
	          	templateUrl:"company/view.html",
	         	controllerAs:'company'
	      	})
	      	.state("index.company.create",{
	          	url:"/create",
	          	controller:'companyController',
	          	templateUrl:"company/create.html",
	         	controllerAs:'company'
	      	})
		}
})();