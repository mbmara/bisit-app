(function(){
	'use strict';
	angular
		.module('admDashboard')
		.config(['$stateProvider',routes]);
		function routes($stateProvider){

	   	 	$stateProvider
	   	 	.state("index.company",{
	          	url:"company",
	          	controller:'companyController',
	          	templateUrl:"company/index/view.html",
	         	  controllerAs:'company'
	      })
				.state("index.company.detail",{
	          	url:"/detail/:id",
	          	controller:'companyPreviewController',
	          	templateUrl:"company/preview/view.html",
	         	  controllerAs:'company_view'
				})

		}
})();
