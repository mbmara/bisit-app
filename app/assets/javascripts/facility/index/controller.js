(function(){
	'use strict';

	angular
		.module('admDashboard')
		.controller('facilityController', facilityController);

		facilityController.$inject=['FacilityFactory','Notification'];

		function facilityController( FacilityFactory,Notification){
			var facility = this;
			
			
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