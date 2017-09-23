(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('loginController',loginController);

		loginController.$inject = ['UserFactory','Notification','$state','Server'];

		function loginController(UserFactory,Notification,$state, Server){
			var login = this;
			login.data={
				email:"tearhear18@gmail.com",
				password:"123123"
			}
			login.user = user;

			function user(credentials){
				UserFactory.login( credentials, function(res){
					if(res.data.status){
						Server.setToken(res.data.payload);
						$state.go("index");
					}else{
						Notification.showError(res.data.payload);
					}
				});
			}
		}
})();
