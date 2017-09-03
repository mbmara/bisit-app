(function(){
	'use strict';

	angular
		.module('admDashboard')
		.controller('kioskIndexController', kioskIndexController);

		kioskIndexController.$inject=['UserFactory','visitorFactory','CompanyFactory','$state','UserAuth','$interval','$timeout','Scanner','$scope','Notification'];

		function kioskIndexController( UserFactory,visitorFactory, CompanyFactory,$state,UserAuth, $interval, $timeout, Scanner, $scope,Notification ){
			
			var kiosk_index = this, video;
			kiosk_index.stage = 1;
			kiosk_index.clock = Date.now();
			kiosk_index.new_visitor = new_visitor;
			kiosk_index.cancel_visitor = cancel_visitor;
			kiosk_index.openCamera = openCamera;
			kiosk_index.cancelCamera = cancelCamera;
			kiosk_index.takePicture = takePicture;
			kiosk_index.reTake = reTake;
			kiosk_index.confirm = confirm;
			kiosk_index.loadOtherCam = loadOtherCam;
			kiosk_index.getCompanyStaff = getCompanyStaff;
			kiosk_index.loadQrCamera = loadQrCamera;
			kiosk_index.cancelQRCamera = cancelQRCamera;
			kiosk_index.loadOtherQrCam = loadOtherQrCam;
			kiosk_index.confirmQrCode = confirmQrCode;
			kiosk_index.loginVisitor = loginVisitor;
			kiosk_index.logout_visitor = logout_visitor;
			kiosk_index.search_visitor = search_visitor;
			
			kiosk_index.process = false;
			CompanyFactory.getList( function(res){
				kiosk_index.facility = UserFactory.facility.name;
				kiosk_index.companies = res.data.companies;
			});

			$interval( function(){
				kiosk_index.clock = Date.now();
			},1000)

			function logout_visitor(){
				$state.go("kiosk.logout")
			}
			function search_visitor(){
				$state.go("kiosk.search")
			}
			function loginVisitor(){
				kiosk_index.process = true;
				visitorFactory.login( kiosk_index.visitor, function(res){
					kiosk_index.process = false;
					if(angular.isUndefined(kiosk_index.visitor.visitor_img)){
						Notification.error("visitor photo is missing");
						return false;
					}
					if(angular.isUndefined(kiosk_index.visitor.identifiction_code)){
						Notification.error("visitor identificaion missing");
						return false;
					}
					if(res.data.status){
						Notification.showSuccess("Visitor is now login");
						kiosk_index.visitor={};
					}else{
						Notification.showError(res.data.payload);
					}

				});
			}
			function confirmQrCode(){
				qrcamera.stop();
				$("#qrCamera").modal("hide");	
			}
			function loadOtherQrCam( index ){
				qrcamera.stop();
				qrcamera.start(kiosk_index.qrcams[index]);
			}
			function cancelQRCamera(){
				qrcamera.stop();
				$("#qrCamera").modal("hide");
			}
			var qrcamera;
			function loadQrCamera(){

				$("#qrCamera").modal("show");
				
				$timeout( function(){
					qrcamera = new Instascan.Scanner({ video: document.getElementById('qrcam') ,mirror:false,backgroundScan:false});
				
					Instascan.Camera.getCameras().then(function (cameras) {
						kiosk_index.qrcams = cameras;
						if (cameras.length > 0) {
							(cameras.length>1) ? qrcamera.start(cameras[1]) : qrcamera.start(cameras[0]);
				          	
				        } else {
				          console.error('No cameras found.');
				        }

				    }).catch(function (e) {
				        console.error(e);
				    });
				    qrcamera.addListener('scan', function (content) {
						kiosk_index.visitor.identifiction_code = content;
						$scope.$apply();
					});
				    

				},300)
			}

			kiosk_index.devices  = [];
			Scanner.enumDeviceCamera( function(devices){
				kiosk_index.devices  = devices;
			});	//initialize camera
			kiosk_index.visitor = {};
			function getCompanyStaff( id ){
				CompanyFactory.getStaff(id, function(res){
					
					kiosk_index.staffs = res.data;
				})
			}

			function loadOtherCam( id ){
				Scanner.stopCamera();
				
				var constraints = {
                   
                    video: {
                      optional: [{
                        sourceId: id
                      }]
                    }
                };
             
            	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
					window.stream = stream;
					video.src = window.URL.createObjectURL(stream);
					video.play();
				});
                
			}
			function confirm(){
				$("#takePicture").modal("hide");	
			}
			function takePicture(){
				$timeout( function(){
					var canvas = document.getElementById('canvass');
					var context = canvas.getContext('2d');
					context.drawImage(video, 0, 0, 400, 300);
					kiosk_index.visitor.visitor_img = canvas.toDataURL();
					Scanner.stopCamera();
				},300)
			}
			function reTake(){
				delete kiosk_index.visitor.visitor_img;
				openCamera();
			}
			function cancelCamera(){
				Scanner.stopCamera();
				delete kiosk_index.visitor.visitor_img;
				$("#takePicture").modal("hide");
			}
			function openCamera(){
				if(kiosk_index.visitor.visitor_img){
					$("#takePicture").modal("show");
					return false;
				}
				if(kiosk_index.devices.length===0){
					alert("no camera available");
					return false;
				}
				var constraints = {
                    video: {
                      optional: [{
                        sourceId: (kiosk_index.devices.length>1) ? kiosk_index.devices[1] : kiosk_index.devices[0]
                      }]
                    }
                };
                $timeout( function(){
                	video  = document.getElementById('video');
                	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
						window.stream = stream;
						video.src = window.URL.createObjectURL(stream);
						video.play();
					},300);
					$("#takePicture").modal("show");
                })
				
			}
			function cancel_visitor(){
				kiosk_index.visitor = {};
				kiosk_index.stage = 1;
			}
			function new_visitor(){
				kiosk_index.stage = 2;
			}
		}

})()
