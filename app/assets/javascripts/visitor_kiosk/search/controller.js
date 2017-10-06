(function(){
	'use strict';

	angular
		.module('admDashboard')
		.controller('searchKioskController', searchKioskController);

		searchKioskController.$inject=['UserFactory','$state','UserAuth','visitorFactory','Notification'];

		function searchKioskController( UserFactory, $state,UserAuth, visitorFactory, Notification){
			var kiosk_search = this,qrcamera;
			
			kiosk_search.find = find;
			kiosk_search.data ={};
			kiosk_search.view = view;
			kiosk_search.login = login;
			kiosk_search.logout = logout;
			
			function login(){
				visitorFactory.relogin( kiosk_search.visitor_info, function(res){
					console.log(res);
				});
			}

			function logout(){
				visitorFactory.forceLogout(kiosk_search.visitor_info.id, function(res){
					delete kiosk_search.visitor_info;
					Notification.showSuccess("Visitor is now force logout");
				});

			}
			function view(id){
				visitorFactory.info( id , function(res){
					console.log(res);
					kiosk_search.visitor_info = res.data.info;
				});
			}
			function find(){
				visitorFactory.find( kiosk_search.data.name , function(res){
					kiosk_search.result = res.data;
				});
			}

		}

})()
