(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('identificationController',identificationController);

		identificationController.$inject = ['$state','IdentificationFactory','FacilityFactory','UserFactory','QRCamera','Notification'];

		function identificationController( $state,IdentificationFactory,FacilityFactory, UserFactory,QRCamera,Notification){
			var identification = this,params={};
			identification.qrcamera_window = false;

			var state = $state.current.name.split(".")[1] || "index"
			identification.byFacility = byFacility;

			identification.temp={
				id:""
			}
			function byFacility( id ){
				identification.temp.id = id;
			}
			UserFactory.initialize(state, function(permission){
				identification.access = UserFactory.access;
				identification.reload = reload;
				IdentificationFactory.getAll( function(res){
					identification.ids = res.data.identifications;
					identification.facilities = res.data.facilities;
					params.facility = identification.facilities[0].id;
				});
				QRCamera.confirm = function(data){
					params.serial = data;
					identification.qrcamera_window = false;
					IdentificationFactory.create(params, function(res){
						if(res.data.status){
							Notification.showSuccess(res.data.payload);
							reload();
						}else{
							Notification.showError(res.data.payload);
						}
					})
				}
				QRCamera.cancel = function(){
					identification.qrcamera_window = false;
				}
			});

			function reload(){
				IdentificationFactory.getAll( function(res){
					identification.ids = res.data.identifications;
					identification.facilities = res.data.facilities;
				});
			}
			
		}
})();
