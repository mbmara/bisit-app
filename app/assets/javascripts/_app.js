(function(){
	'use strict';
	angular
		.module('admDashboard',['ui.router','templates','ngStorage','cgNotify','yaru22.angular-timeago','720kb.datepicker'])
		.config(['$stateProvider','$urlRouterProvider','$locationProvider',routes]);

		function routes($stateProvider, $urlRouterProvider, $locationProvider){
			$locationProvider.html5Mode(false).hashPrefix('');
	   	 	$urlRouterProvider.otherwise('/');

	   	 	$stateProvider
	   	 	.state("index",{
	          	url:"/",
	          	controller:'indexController',
	          	templateUrl:"index/view.html",
	         	  controllerAs:'index',
							resolve:{
								UserAuth:['UserFactory','$state',function(UserFactory, $state ){
									return UserFactory.authenticate().then( function(res){
										if(res.data.status){
												UserFactory.role = res.data.user_role;
												UserFactory.profile = res.data.profile;
												UserFactory.permission = res.data.permission;
												UserFactory.access = res.data.permission.id;
												UserFactory.facility = res.data.facility;
												return res.data;
										}else{
											$state.go('login');
										}
									},
									function(){
										$state.go('login');
									}
								);
								}]
							}
			})
			.state("login",{
	          	url:"/login",
	          	controller:'loginController',
	          	templateUrl:"login/view.html",
	         		controllerAs:'login'

			})
			.state("forgotpass",{
	          	url:"/forgotpass",
	          	controller:'forgotpassController',
	          	templateUrl:"forgotpass/view.html",
	         		controllerAs:'forgot'

			})
			.state("pagenotfound",{
	          	url:"/pagenotfound",
	          	templateUrl:"pagenotfound/view.html"
			})

		}
})();
