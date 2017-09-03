(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('kioskController',kioskController);

		kioskController.$inject = ['$interval','CompanyFactory','$timeout','Scanner','$scope','visitorFactory','$state','Notification','UserFactory'];

		function kioskController( $interval,CompanyFactory, $timeout, Scanner, $scope,visitorFactory,$state, Notification, UserFactory){
			var kiosk = this;

			kiosk.devices  = [];
			Scanner.enumDeviceCamera( function(devices){
				kiosk.devices  = devices;
				
			});	//initialize camera
			
			kiosk.loadAlterCamera = function(index){
				Scanner.stopCamera();
				
				var constraints = {
                   
                    video: {
                      optional: [{
                        sourceId: kiosk.devices[index]
                      }]
                    }
                };
                $timeout( function(){
                	video  = document.getElementById('video');
                	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
						window.stream = stream;
						video.src = window.URL.createObjectURL(stream);
						video.play();
					},500);
                })

			}
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
			kiosk.linknewId = linknewId;
			kiosk.reloginVisitor = reloginVisitor;

			CompanyFactory.getList( function(res){
				kiosk.facility = UserFactory.facility.name;
				kiosk.companies = res.data.companies;
			});
			kiosk.clock = Date.now();
			$interval( function(){
				kiosk.clock = Date.now();
			},1000)
			
				
			
			



			function reloginVisitor(){
				visitorFactory.relogin( kiosk.data, function(res){
					if(res.data.status){
						alert("visitor is now login");
						reload();
					}else{
						Notification.showError(res.data.payload)
					}
				})

			}
			function linknewId(){
				kiosk.step=7;
				$timeout( function(){
					Scanner.init( new Instascan.Scanner({ video: document.getElementById('preview2') }) );

					Scanner.instance.addListener('scan', function (content) {
						kiosk.data.identifiction_code = content;
						$scope.$apply();
					});

				},100)
			}
			function visitor_info(id){
				kiosk.data.visitor_id = id;
				kiosk.step = 6;
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
					if(res.data.status){
						alert("Visitor is now logout");
						reload();
					}else{
						Notification.showError(res.data.payload)
					}

				});

			}
			function reload(){
				window.location.reload();
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
			kiosk.loadCamera = function(){

				kiosk.step=3;
				var constraints = {
                   
                    video: {
                      optional: [{
                        sourceId: kiosk.devices[0]
                      }]
                    }
                };
                $timeout( function(){
                	video  = document.getElementById('video');
                	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
						window.stream = stream;
						video.src = window.URL.createObjectURL(stream);
						video.play();
					},500);
                })
               
			}
			kiosk.capture = function(){
				kiosk.canvass = true;

				$timeout( function(){
					canvas = document.getElementById('canvass');
					context = canvas.getContext('2d');
					context.drawImage(video, 0, 0, 350, 262);
					kiosk.data.visitor_img = canvas.toDataURL();
					Scanner.stopCamera();
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
			
		}
})();
