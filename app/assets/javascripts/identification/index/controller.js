(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('identificationController',identificationController);

		identificationController.$inject = ['$interval','$timeout','$state','IdentificationFactory','FacilityFactory','UserFactory'];

		function identificationController( $interval, $timeout, $state,IdentificationFactory,FacilityFactory, UserFactory){
			var identification = this;
			var state = $state.current.name.split(".")[1] || "index"
			identification.byFacility = byFacility;

			identification.temp={
				id:""
			}
			function byFacility( id ){
				identification.temp.id = id;
			}
			UserFactory.initialize(state, function(permission){
				identification.reload = reload;
				IdentificationFactory.getAll( function(res){
					identification.ids = res.data.identifications;
					identification.facilities = res.data.facilities;
					identification.facilities.push({id:"",name:"All"})
				});
			});

			function reload(){
				IdentificationFactory.getAll( function(res){
					identification.ids = res.data.identifications;
					identification.facilities = res.data.facilities;
				});
			}
			identification.addForm = function(){
				$state.go("index.identification.create");
			}
		}
})();
