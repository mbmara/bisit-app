(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('publicKioskController',publicKioskController);

		publicKioskController.$inject = ['UserFactory','$state','$timeout','Scanner','CompanyFactory','Notification','visitorFactory'];

		function publicKioskController(UserFactory, $state, $timeout, Scanner, CompanyFactory,Notification,visitorFactory){
            var public_kiosk = this,qrcamera,video;

            public_kiosk.cancelCamera = cancelCamera;
            public_kiosk.getCompanyStaff = getCompanyStaff;
            public_kiosk.takePicture = takePicture;
            public_kiosk.confirm = confirm;
            public_kiosk.reTake = reTake;
            public_kiosk.loadOtherCam = loadOtherCam;
            
            var state = $state.current.name.split(".")[1] || "self-assesment"
            
            public_kiosk.visitor = {}

			UserFactory.initialize(state, function(permission){
				public_kiosk.role = UserFactory.role;
				public_kiosk.access = UserFactory.access;
				public_kiosk.permission = permission;
				public_kiosk.openCamera = openCamera;

				public_kiosk.cancel = cancel;
				public_kiosk.submitVisitorProfile = submitVisitorProfile;
				public_kiosk.devices  = [];
				Scanner.enumDeviceCamera( function(devices){
					public_kiosk.devices  = devices;
				});	//initialize camera
				CompanyFactory.getList( function(res){
					public_kiosk.facility = UserFactory.facility.name;
					public_kiosk.companies = res.data.companies;
				});
			});

			
			function getCompanyStaff( id ){
				CompanyFactory.getStaff(id, function(res){
					public_kiosk.staffs = res.data;
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
			function reTake(){
				delete public_kiosk.visitor.visitor_img;
				openCamera();
			}
			function cancelCamera(){
				Scanner.stopCamera();
				delete public_kiosk.visitor.visitor_img;
				$("#takePicture2").modal("hide");
			}
			function confirm(){
				$("#takePicture2").modal("hide");	
			}
			function takePicture(){
				$timeout( function(){
					var canvas = document.getElementById('canvass');
					var context = canvas.getContext('2d');
					context.drawImage(video, 0, 0, 400, 300);
					public_kiosk.visitor.visitor_img = canvas.toDataURL();
					Scanner.stopCamera();
				},300)
			}
			function openCamera(){
				
				if(public_kiosk.visitor.visitor_img){
					$("#takePicture2").modal("show");
					return false;
				}
				if(public_kiosk.devices.length===0){
					alert("no camera available");
					return false;
				}
				var constraints = {
                    video: {
                      optional: [{
                        sourceId: (public_kiosk.devices.length>1) ? public_kiosk.devices[1] : public_kiosk.devices[0]
                      }]
                    }
                };
                $timeout( function(){
                	video  = document.getElementById('video2');
                	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
						window.stream = stream;
						video.src = window.URL.createObjectURL(stream);
						video.play();
					},300);
					$("#takePicture2").modal("show");
                })
				
			}
			function cancel(){
				public_kiosk.visitor ={};
			}
			function submitVisitorProfile(){
				
				if(angular.isUndefined(public_kiosk.visitor.visitor_img)){
					Notification.error("visitor photo is missing");
					return false;
				}
				visitorFactory.login2( public_kiosk.visitor, function(res){
					console.log(res);
				});
				
			}
            
		}
})();
