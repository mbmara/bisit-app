(function(){
	'use strict';
	angular
		.module('admDashboard')
		.config(['$stateProvider',routes]);

		function routes($stateProvider){

			$stateProvider
				.state('self-assesment.new_visitor',{
					url:"/new_visitor",
					controller:'publicKioskController',
					templateUrl:'public/index/view.html',
					controllerAs:'public_kiosk'
				})
				.state('self-assesment',{
					url:"/self-assesment",
					controller:'mainSelfAssesController',
					templateUrl:'public/main/view.html',
					controllerAs:'public_main_kiosk',
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
				

		}
})();
