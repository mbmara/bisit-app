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
	          	templateUrl:"company/index/view.html",
	         	controllerAs:'company'
	      	})
	      	.state("index.company.create",{
	          	url:"/create",
	          	controller:'companyCreateController',
	          	templateUrl:"company/create/view.html",
	         	controllerAs:'company_create'
			})
			.state("index.company.detail",{
	          	url:"/detail",
	          	//controller:'companyController',
	          	templateUrl:"company/preview/view.html",
	         	//controllerAs:'company'
			})
					  
		}
})();