(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('identificationController',identificationController);

		identificationController.$inject = ['$interval','$timeout','$state'];

		function identificationController( $interval, $timeout, $state ){
			var identification = this;
			
			
			identification.addForm = function(){
				$state.go("index.identification.create");
			}
		}
})();