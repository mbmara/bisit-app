(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('kioskController',kioskController);

		kioskController.$inject = ['$interval','CompanyFactory','$timeout','Scanner','$scope','visitorFactory','$state','Notification'];

		function kioskController( $interval,CompanyFactory, $timeout, Scanner, $scope,visitorFactory,$state, Notification){
			var kiosk = this;

			kiosk.step = 2;
			kiosk.companies = [];
			kiosk.staffs = [];
			kiosk.getCompanyStaff = getCompanyStaff;
			kiosk.loginVisitor = loginVisitor;


			CompanyFactory.getList( function(res){
				kiosk.companies = res.data.companies;
			});
			kiosk.clock = Date.now();
			$interval( function(){
				kiosk.clock = Date.now();
			},1000)


			function loginVisitor(){
				visitorFactory.login( kiosk.data, function(res){
					if(res.data.status){
						kiosk.step = 1;
					}else{
						Notification.showError(res.data.payload);
					}

				});

			}
			function getCompanyStaff( id ){
				CompanyFactory.getStaff(id, function(res){
					console.log(res);
					kiosk.staffs = res.data;
				})
			}

			kiosk.canvass = false;

			var video,canvas,context,stream_data;
			kiosk.capture = function(){
				kiosk.canvass = true;

				$timeout( function(){
					canvas = document.getElementById('canvass');
					context = canvas.getContext('2d');
					context.drawImage(video, 0, 0, 400, 300);
				},200)

			}
			kiosk.back = function(step){

	   			if(step==3){
	   				kiosk.loadCamera();
	   			}
				if(step==2){
					stream_data.getTracks()[0].stop();
					if(Scanner.running){
		            	Scanner.instance.stop();
		            }
				}
				kiosk.step = step;
			}
			kiosk.scanQRCode = function(){
				kiosk.data.visitor_img = canvas.toDataURL();

				stream_data.getTracks()[0].stop();
				kiosk.step = 4;
				kiosk.qrresult = "";
				$timeout( function(){
					Scanner.init( new Instascan.Scanner({ video: document.getElementById('preview') }) );

					Scanner.instance.addListener('scan', function (content) {
						kiosk.data.identifiction_code = content;
						$scope.$apply();
					});

				},1000)
			}
			kiosk.loadCamera = function(){

				kiosk.step=3;
				$timeout( function(){
					// Grab elements, create settings, etc.
					video = document.getElementById('video');

					// Get access to the camera!
					if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
						//Not adding `{ audio: true }` since we only want video now
						navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
							stream_data= stream;
							video.src = window.URL.createObjectURL(stream_data);
							video.play();
						});

					}
				},100)

			}
		}
})();
