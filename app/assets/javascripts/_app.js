(function(){
	'use strict';
	angular
		.module('admDashboard',['ui.router','templates','ngStorage'])
		.config(['$stateProvider','$urlRouterProvider','$locationProvider',routes]);

		function routes($stateProvider, $urlRouterProvider, $locationProvider){
			$locationProvider.html5Mode(false).hashPrefix('');
	   	 	$urlRouterProvider.otherwise('/');

	   	 	$stateProvider
	   	 	.state("index",{
	          	url:"/",
	          	controller:'indexController',
	          	templateUrl:"index/view.html",
	         	controllerAs:'index'
	      	})
		}
})();