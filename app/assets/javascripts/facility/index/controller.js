(function(){
	'use strict';

	angular
		.module('admDashboard')
		.controller('facilityController', facilityController);

		facilityController.$inject=['FacilityFactory','Notification','UserFactory','$state'];

		function facilityController( FacilityFactory,Notification,UserFactory, $state ){
			var facility = this;

			UserFactory.initialize($state.current.url, function(permission){
				facility.permission = permission;
			});

			FacilityFactory.getAll( function(res){
				facility.lists = res.data;
			});


			facility.addFacility = function(data){
				FacilityFactory.create( data, function(res){
					if(res.data.status){

						FacilityFactory.getAll( function(res){
							facility.lists = res.data;
							$('#createFacility').modal('hide');
						});
					}else{
						Notification.showError(res.data.payload);
					}
				});
			}
		}

})()
