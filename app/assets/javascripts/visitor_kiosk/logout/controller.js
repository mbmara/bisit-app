(function(){
	'use strict';

	angular
		.module('admDashboard')
		.controller('logoutKioskController', logoutKioskController);

		logoutKioskController.$inject=['UserFactory','$state','UserAuth','Notification','visitorFactory','QRCamera'];

		function logoutKioskController( UserFactory, $state,UserAuth , Notification,visitorFactory, QRCamera){
			var kiosk_logout = this,params={};
			
			kiosk_logout.qrcamera_window = true;
			kiosk_logout.infoWindow = false;
			kiosk_logout.cancel = cancel;
			kiosk_logout.abort = abort;
			kiosk_logout.logout = logout;

			QRCamera.confirm = function( data ){
				params.code = data;
				kiosk_logout.qrcamera_window = false;
				visitorFactory.verify(data, function(res){
					if(res.data.status){
						kiosk_logout.visitor_info = res.data.payload;
						kiosk_logout.infoWindow = true;	
					}else{
						kiosk_logout.qrcamera_window = true;
						Notification.showError(res.data.payload);
					}
				})
			}
			QRCamera.cancel = function(){
				kiosk_logout.qrcamera_window = true;
				$state.go("kiosk");
			}
			function cancel(){
				kiosk_logout.qrcamera_window = true;
				$state.go("kiosk");
			}

			function abort(){
				kiosk_logout.qrcamera_window = true;
				kiosk_logout.infoWindow = true
			}
			function logout(){
				visitorFactory.logout(params.code, function(res){
					if(res.data.status){
						Notification.showSuccess("Visitor successfuly logout");
						delete params.code;
						kiosk_logout.visitor_info = {};
						kiosk_logout.qrcamera_window = true;
						kiosk_logout.infoWindow = true;
						
					}else{
						Notification.showError(res.data.payload)
					}

				});	
			}

		}

})()
