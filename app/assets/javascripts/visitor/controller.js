(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('visitorController',visitorController);

		visitorController.$inject = ['$interval','CompanyFactory','$timeout','Scanner','$scope','visitorFactory','$state'];

		function visitorController( $interval,CompanyFactory, $timeout, Scanner, $scope,visitorFactory,$state){
			var visitMain = this;

			visitMain.step = 1;
			visitMain.companies = [];
			visitMain.staffs = [];
			visitMain.getCompanyStaff = getCompanyStaff;
			visitMain.loginVisitor = loginVisitor;


			CompanyFactory.getList( function(res){
				visitMain.companies = res.data;
			});
			$interval( function(){
				visitMain.clock = Date.now();
			},1000)


			function loginVisitor(){
				visitorFactory.login( visitMain.data, function(res){
					alert(res.data.payload);
					$state.go('visitor');
				});

			}
			function getCompanyStaff( id ){
				CompanyFactory.getStaff(id, function(res){
					visitMain.staffs = res.data;
				})
			}

			visitMain.canvass = false;

			var video,canvas,context,stream_data;
			visitMain.capture = function(){
				visitMain.canvass = true;

				$timeout( function(){
					canvas = document.getElementById('canvass');
					context = canvas.getContext('2d');
					context.drawImage(video, 0, 0, 400, 300);
				},200)
				
			}
			visitMain.back = function(step){
				
	   			if(step==3){
	   				visitMain.loadCamera();
	   			}
				if(step==2){
					stream_data.getTracks()[0].stop();
					if(Scanner.running){
		            	Scanner.instance.stop();
		            }
				}
				visitMain.step = step;
			}
			visitMain.scanQRCode = function(){
				visitMain.data.visitor_img = canvas.toDataURL();
				
				stream_data.getTracks()[0].stop();
				visitMain.step = 4;	
				visitMain.qrresult = "";
				$timeout( function(){
					Scanner.init( new Instascan.Scanner({ video: document.getElementById('preview') }) );
				
					Scanner.instance.addListener('scan', function (content) {
						visitMain.data.identifiction_code = content;
						$scope.$apply();
					});
					
				},1000)
			}
			visitMain.loadCamera = function(){

				visitMain.step=3;
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