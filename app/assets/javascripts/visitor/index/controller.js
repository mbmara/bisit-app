(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('visitorController',visitorController);

		visitorController.$inject = ['Notification','$state','UserFactory'];

		function visitorController(Notification,$state, UserFactory){
            var visitor = this;
            var state = $state.current.name.split(".")[1] || "index"

						UserFactory.initialize(state, function(permission){
							console.log(permission);
						});



		}
})();
