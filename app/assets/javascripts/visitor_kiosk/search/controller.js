(function(){
	'use strict';

	angular
		.module('admDashboard')
		.controller('searchKioskController', searchKioskController);

		searchKioskController.$inject=['UserFactory','$state','UserAuth','visitorFactory','$timeout','Notification'];

		function searchKioskController( UserFactory, $state,UserAuth, visitorFactory , $timeout, Notification){
			var kiosk_search = this,qrcamera;
			
			kiosk_search.find = find;
			kiosk_search.data ={};
			kiosk_search.view = view;
			kiosk_search.relogin = relogin;
			kiosk_search.loadQrCamera = loadQrCamera;
			kiosk_search.loadOtherQrCam = loadOtherQrCam;
			kiosk_search.cancelQRCamera = cancelQRCamera;
			kiosk_search.confirmQrCode = confirmQrCode;
			kiosk_search.relogin  = relogin;

			kiosk_search.visitor={}
			kiosk_search.process = false;

			
			function confirmQrCode(){
				qrcamera.stop();
				$("#qrCamera2").modal("hide");	
			}

			function cancelQRCamera(){
				qrcamera.stop();
				$("#qrCamera2").modal("hide");
			}
			function loadOtherQrCam( index ){
				qrcamera.stop();
				qrcamera.start(kiosk_search.qrcams[index]);
			}
			function loadQrCamera(){

				$("#qrCamera2").modal("show");
				
				$timeout( function(){
					qrcamera = new Instascan.Scanner({ video: document.getElementById('qrcam2') ,mirror:false,backgroundScan:false});
				
					Instascan.Camera.getCameras().then(function (cameras) {
						kiosk_search.qrcams = cameras;
						if (cameras.length > 0) {
							(cameras.length>1) ? qrcamera.start(cameras[1]) : qrcamera.start(cameras[0]);
				          	
				        } else {
				          console.error('No cameras found.');
				        }

				    }).catch(function (e) {
				        console.error(e);
				    });
				    qrcamera.addListener('scan', function (content) {
						
						kiosk_search.visitor.identifiction_code = content;
						$scope.$apply();
					});
				    

				},300)
			}
			function relogin(){
				kiosk_search.process = true;
				visitorFactory.relogin( kiosk_search.visitor, function(res){
					kiosk_search.process = false;
					if(res.data.status){
						delete kiosk_search.visitor_info;
						kiosk_search.visitor={};
						Notification.showSuccess("Visitor is not login");
					}else{
						Notification.showError(res.data.payload)
					}
				})
			}
			function view(id){
				kiosk_search.visitor.visitor_id = id;
				visitorFactory.info( id , function(res){
					kiosk_search.visitor_info = res.data;
				});
			}
			function find(){
				visitorFactory.find( kiosk_search.data.name , function(res){
					console.log(res);
					kiosk_search.result = res.data;
				});
			}

		}

})()
