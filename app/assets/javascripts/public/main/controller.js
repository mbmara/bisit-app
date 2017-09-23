(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('mainSelfAssesController',mainSelfAssesController);

		mainSelfAssesController.$inject = ['Notification','$state','UserFactory','visitorFactory','$timeout','$scope','$interval'];

		function mainSelfAssesController(Notification,$state, UserFactory,visitorFactory,$timeout, $scope, $interval ){
            
            var public_main_kiosk = this;

            public_main_kiosk.stage = 1;

            public_main_kiosk.clock = Date.now();

            public_main_kiosk.facility = UserFactory.facility.name;

            $interval( function(){
				public_main_kiosk.clock = Date.now();
			},1000)
		}
})();
