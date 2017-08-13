(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('identificationController',identificationController);

		identificationController.$inject = ['$interval','$timeout','$state','IdentificationFactory'];

		function identificationController( $interval, $timeout, $state,IdentificationFactory){
			var identification = this;
			
			IdentificationFactory.getAll( function(res){
				identification.ids = res.data;
			});
			identification.addForm = function(){
				$state.go("index.identification.create");
			}
		}
})();