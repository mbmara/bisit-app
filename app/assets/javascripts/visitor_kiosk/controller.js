(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('kioskController',kioskController);

		kioskController.$inject = ['$interval','CompanyFactory','$timeout','Scanner','$scope','visitorFactory','$state','Notification','UserFactory'];

		function kioskController( $interval,CompanyFactory, $timeout, Scanner, $scope,visitorFactory,$state, Notification, UserFactory){
			var kiosk = this;

			//initial data
			kiosk.data={};
			kiosk.step = 1;
			kiosk.companies = [];
			kiosk.staffs = [];
			kiosk.getCompanyStaff = getCompanyStaff;
			kiosk.loginVisitor = loginVisitor;
			kiosk.home = home;
			kiosk.logout = logout;
			kiosk.visitorLogout = visitorLogout;
			kiosk.mode = "login";
			kiosk.logoutVisitor = logoutVisitor;
			kiosk.reload = reload;
			kiosk.find = find;
			kiosk.visitor_info = visitor_info;

			CompanyFactory.getList( function(res){
				kiosk.facility = UserFactory.facility.name;
				kiosk.companies = res.data.companies;
			});
			kiosk.clock = Date.now();
			$interval( function(){
				kiosk.clock = Date.now();
			},1000)

			function visitor_info(id){
				console.log(id);
				visitorFactory.info( id , function(res){

					kiosk.modal = res.data;
					$("#visitor_info").modal('show');
				});
			}
			function find(str){

				if(typeof(str)!='undefined' && str.length > 2 ){
					visitorFactory.find( str, function(res){
						kiosk.finder = res.data;
					});
				}

			}
			function logoutVisitor(){
				visitorFactory.logout(kiosk.data.identifiction_code, function(res){
					console.log(res);
					alert("Visito is now logout");
					reload();
				});

			}
			function reload(){
				$state.go('kiosk',{},{reload:true})
			}
			function visitorLogout(){
				//kiosk.loadCamera();
				kiosk.step = 4;
				kiosk.mode = "logout";
				$timeout( function(){
					Scanner.init( new Instascan.Scanner({ video: document.getElementById('preview') }) );

					Scanner.instance.addListener('scan', function (content) {
						kiosk.data.identifiction_code = content;
						$scope.$apply();
					});

				},1000)
			}
			function home(){
				window.location.reload();
			}
			function logout(){
				UserFactory.logout();
				$state.go("login");
			}



			function loginVisitor(){
				visitorFactory.login( kiosk.data, function(res){
					if(res.data.status){
						kiosk.step = 1;
						alert("Visitor has been successfully log In");
						reload();
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
					kiosk.data.visitor_img = canvas.toDataURL();
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
				if(!kiosk.data.visitor_img){
					alert("Take photo first");
					return false;
				}
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
						console.log(navigator.mediaDevices);
						const constraints = {
				        advanced: [{
				            facingMode: "environment"
				        }]
				    };
						navigator.mediaDevices.getUserMedia({ video: constraints }).then(function(stream) {
							console.log(stream);
							stream_data= stream;
							video.src = window.URL.createObjectURL(stream_data);
							video.play();
						});

					}
				},100)

			}
		}
})();
