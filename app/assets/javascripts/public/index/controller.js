(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('publicKioskController',publicKioskController);

		publicKioskController.$inject = ['UserFactory','$state','WebCamera','CompanyFactory','visitorFactory','Notification','$timeout'];

		function publicKioskController(UserFactory, $state, WebCamera, CompanyFactory, visitorFactory,Notification, $timeout){
            
            var public_kiosk = this;

            public_kiosk.camera = false;
            public_kiosk.step = 1;
            public_kiosk.dismiss = dismiss; 

            
            var state = $state.current.name.split(".")[0] || "self-assesment"
   
            public_kiosk.visitor = {}

			UserFactory.initialize(state, function(permission){
				public_kiosk.role = UserFactory.role;
				public_kiosk.access = UserFactory.access;
				public_kiosk.permission = permission;
				
				//public_kiosk.cancel = cancel;
				public_kiosk.submitVisitorProfile = submitVisitorProfile;

				CompanyFactory.getList( function(res){
					public_kiosk.facility = UserFactory.facility.name;
					public_kiosk.companies = res.data.companies;
				});
				public_kiosk.openCamera = openCamera;
				public_kiosk.getCompanyStaff = getCompanyStaff;
			});

			function openCamera(){
            	public_kiosk.camera = true;
            	WebCamera.cancel = function(){
            		public_kiosk.camera = false;
            		public_kiosk.visitor.visitor_img = null;
            	}
            	WebCamera.confirm = function( img ){
            		public_kiosk.visitor.visitor_img = img;
            		public_kiosk.camera = false;
            	}
            }

            function dismiss(){
            	WebCamera.destroy();
            	$state.go("self-assesment");
            }
			
			function getCompanyStaff( id ){
				CompanyFactory.getStaff(id, function(res){
					
					public_kiosk.staffs = res.data;
				})
			}

			var timer;

			function submitVisitorProfile(){
				
				if(angular.isUndefined(public_kiosk.visitor.visitor_img) || public_kiosk.visitor.visitor_img == null){
					Notification.error("visitor photo is missing");
					return false;
				}
				public_kiosk.step = 0;
				visitorFactory.login2( public_kiosk.visitor, function(res){
					if(res.data.status){
						WebCamera.destroy();
						public_kiosk.step = 2;
						timer = $timeout( function(){
							$state.go("self-assesment");
						},15000)
					}else{
						alert("Registration failed!. Please contact customer service");
					}
				});
				
			}
            
		}
})();
