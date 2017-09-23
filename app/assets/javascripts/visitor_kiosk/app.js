(function(){
	'use strict';
	angular
		.module('admDashboard')
		.config(['$stateProvider',routes]);

		function routes($stateProvider){

			$stateProvider
				.state('kiosk.logout',{
					url:"/logout",
					controller:'logoutKioskController',
					templateUrl:'visitor_kiosk/logout/view.html',
					controllerAs:'kiosk_logout'
				})
				.state('kiosk.visitors_que',{
					url:"/visitors_que",
					controller:'visitorsqueController',
					templateUrl:'visitor_kiosk/visitors_que/view.html',
					controllerAs:'visitors_que'
				})
				.state('kiosk.search',{
					url:"/search",
					controller:'searchKioskController',
					templateUrl:'visitor_kiosk/search/view.html',
					controllerAs:'kiosk_search'
				})
				.state("kiosk",{
					url:"/kiosk",
					controller:'kioskIndexController',
					templateUrl:"visitor_kiosk/index/view.html",
					controllerAs:'kiosk_index',
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
