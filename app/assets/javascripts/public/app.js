(function(){
	'use strict';
	angular
		.module('admDashboard')
		.config(['$stateProvider',routes]);

		function routes($stateProvider){

			$stateProvider
				.state('self-assesment',{
					url:"/self-assesment",
					controller:'publicKioskController',
					templateUrl:'public/index/view.html',
					controllerAs:'public_kiosk',
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
