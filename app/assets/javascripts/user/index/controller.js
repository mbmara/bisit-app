(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('userController',userController);

		userController.$inject = ['UserFactory','Notification','$state'];

		function userController(UserFactory,Notification,$state){
			var user = this;
			loadUser();

			user.loadUser = loadUser;
			user.create = create;


			function create(userdata){
				UserFactory.create(userdata, function(res){
					if(res.data.status){
						UserFactory.getList( function(res){
						 	$("#createUser").modal("hide");
							user.modal = {};
						});

					}else{
						Notification.showError(res.data.payload);
					}
				});
			}
			function  loadUser(){
				UserFactory.getList( function(res){
					user.data = res.data;
				});
			}

		}
})();
