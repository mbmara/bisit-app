(function(){
	'use strict';

	angular
		.module('admDashboard')
		.controller('logoutKioskController', logoutKioskController);

		logoutKioskController.$inject=['UserFactory','$state','UserAuth','Notification','visitorFactory','QRCamera'];

		function logoutKioskController( UserFactory, $state,UserAuth , Notification,visitorFactory, QRCamera){
			var kiosk_logout = this,params={};
			
			kiosk_logout.qrcamera_window = true;
			kiosk_logout.cancel = cancel;
			kiosk_logout.abort = abort;
			kiosk_logout.logout = logout;

			QRCamera.confirm = function( data ){
				params.code = data;
				kiosk_logout.qrcamera_window = false;
				visitorFactory.verify(data, function(res){
					console.log(res);
					if(res.data.status){
						kiosk_logout.visitor_info = res.data.payload;	
					}else{
						kiosk_logout.qrcamera_window = true;
						Notification.showError(res.data.payload);
					}
					
				})
			}
			QRCamera.cancel = function(){
				kiosk_logout.qrcamera_window = false;
				$state.go("kiosk");
			}
			function cancel(){
				$state.go("kiosk");
			}

			function abort(){
				kiosk_logout.qrcamera_window = true;
			}
			function logout(){
				visitorFactory.logout(params.code, function(res){
					if(res.data.status){
						Notification.showSuccess("Visitor successfuly logout");
						delete params.code;
						kiosk_logout.visitor_info = {};
						kiosk_logout.qrcamera_window = true;
					}else{
						Notification.showError(res.data.payload)
					}

				});	
			}

		}

})()
