(function(){
	'use strict';

	angular
		.module('admDashboard')
		.controller('logoutKioskController', logoutKioskController);

		logoutKioskController.$inject=['UserFactory','$state','UserAuth','$timeout','Notification','visitorFactory'];

		function logoutKioskController( UserFactory, $state,UserAuth, $timeout , Notification,visitorFactory){
			var kiosk_logout = this,qrcamera;
			
			kiosk_logout.cancel = cancel;
			kiosk_logout.loadOtherQrCam= loadOtherQrCam;
			kiosk_logout.verify = verify;
			kiosk_logout.visitor ={};
			kiosk_logout.logout = logout;
			kiosk_logout.process = false;
			function logout(){
				kiosk_logout.process = true;
				visitorFactory.logout(kiosk_logout.visitor.identifiction_code, function(res){
					if(res.data.status){
						Notification.showSuccess("Visitor successfuly logout");
						kiosk_logout.process = false;
						delete kiosk_logout.visitor_info;
						delete kiosk_logout.visitor.identifiction_code;

					}else{
						Notification.showError(res.data.payload)
					}

				});
			}
			function verify(){
				if(kiosk_logout.visitor.identifiction_code){
					visitorFactory.verify(kiosk_logout.visitor.identifiction_code, function(res){
						if(res.data.status){
							kiosk_logout.visitor_info = res.data.payload;	
						}else{
							delete kiosk_logout.visitor_info;
							Notification.showError(res.data.payload);
						}
						
					})
				}else{
					Notification.error("Please Scan or Enter ID");
				}	
			}

			function cancel(){
				qrcamera.stop();
				delete kiosk_logout.visitor_info;
				$state.go("kiosk");
			}
			function loadOtherQrCam( index ){
				qrcamera.stop();
				qrcamera.start(kiosk_logout.qrcams[index]);
			}
			$timeout( function(){
				qrcamera = new Instascan.Scanner({ video: document.getElementById('qrcam') ,mirror:false,backgroundScan:false});
			
				Instascan.Camera.getCameras().then(function (cameras) {
					kiosk_logout.qrcams = cameras;
					if (cameras.length > 0) {
						(cameras.length>1) ? qrcamera.start(cameras[1]) : qrcamera.start(cameras[0]);
			          	
			        } else {
			          console.error('No cameras found.');
			        }

			    }).catch(function (e) {
			        console.error(e);
			    });
			    qrcamera.addListener('scan', function (content) {
					kiosk_logout.visitor.identifiction_code = content;
					$scope.$apply();
				});
			    

			},300)

		}

})()
