(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('userController',userController);

		userController.$inject = ['UserFactory','Notification'];

		function userController(UserFactory,Notification){
			var user = this;
			user.collections = [];
			loadUser();

			user.loadUser = loadUser;
			user.create = create;

			user.data={
				fname:"Cabug-os",
				lname:"Ramel",
				mname:"Pakig",
				email:"tearhear18@gmail.com",
				password:"123123",
				password1:"123123"
			}
			
			function create(userdata){
				UserFactory.create(userdata, function(res){
					console.log(res);
					if(res.data.status){
						Notification.showSuccess("New user created");
					}else{
						Notification.showError(res.data.payload);
					}
				});
			}
			function  loadUser(){
				 UserFactory.getList( function(res){
					user.collections = res.data;
				});
			}

		}
})();