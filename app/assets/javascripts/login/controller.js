(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('loginController',loginController);

		loginController.$inject = ['UserFactory','Notification','$state'];

		function loginController(UserFactory,Notification,$state){
			var login = this;
			
			login.user = user;

			function user(credentials){
				console.log( credentials );
			}	
		}
})();