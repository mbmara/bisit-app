(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('userController',userController);

		userController.$inject = ['UserFactory','Notification','$state'];

		function userController(UserFactory,Notification,$state){
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
					
					if(res.data.status){
						Notification.showSuccess("New user created");
						$state.go("index.user",{},{reload:true});
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