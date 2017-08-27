(function(){
	'use strict';
	angular
		.module('admDashboard')
		.config(['$stateProvider',routes]);

		function routes($stateProvider){

			$stateProvider
				.state("kiosk",{
					url:"/kiosk",
					controller:'kioskController',
					templateUrl:"visitor_kiosk/view.html",
					controllerAs:'kiosk',
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
