(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('userController',userController);

		userController.$inject = ['UserFactory','Notification','$state'];

		function userController(UserFactory,Notification,$state){
			var user = this;
			user.search = search;

			user.filter={
				facility:"",
				role:""
			}
			var state = $state.current.name.split(".")[1] || "index"
			UserFactory.initialize(state, function(permission){
				user.permission = permission;
				loadUser();
				user.loadUser = loadUser;
				user.create = create;
			});

			function search(search){
				UserFactory.search( search , function(res){
					user.data.users =  res.data.users;
				});
			}
			function create(userdata){
				UserFactory.create(userdata, function(res){
					if(res.data.status){
						UserFactory.getList( function(res){
						 	$("#createUser").modal("hide");
							user.data = res.data;
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
					user.data.facilities.push({id:"",name:"All"});
					user.data.roles.push({id:"",name:"All"});
				});
			}

		}
})();
