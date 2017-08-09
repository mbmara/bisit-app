(function(){
	'use strict';
	angular
		.module('admDashboard')
		.config(['$stateProvider',routes]);

		function routes($stateProvider){
			

	   	 	$stateProvider
	   	 	.state("index.user",{
	          	url:"user",
	          	controller:'userController',
	          	templateUrl:"user/view.html",
	         	controllerAs:'user'
	      	})
	      	.state("index.user.create",{
	          	url:"/create",
	          	//controller:'indexController',
	          	templateUrl:"user/create.html",
	         	controllerAs:'user'
	      	})
		}
})();