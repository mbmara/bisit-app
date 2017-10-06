(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('userController',userController);

		userController.$inject = ['UserFactory','Notification','$state'];

		function userController(UserFactory,Notification,$state){
			var user = this;
			user.search = search;
			user.remove = remove;
			user.info = info;
			user.update = update;

			user.mode = "create";

			user.filter={
				facility:"",
				role:""
			}
			var state = $state.current.name.split(".")[1] || "index"
			UserFactory.initialize(state, function(permission){
				user.role = UserFactory.role;
				user.access = UserFactory.access;
				user.permission = permission;
				loadUser();
				user.loadUser = loadUser;
				user.create = create;
			});

			function update(user ){
				UserFactory.update( user , function(res){
					user.modal ={};
					user.mode="create";
					$("#createUser").modal("hide");
				});
				
			}
			function info( id ){
				user.mode ="update";
				UserFactory.info( id , function(res){
					$("#createUser").modal("show");
					user.modal = res.data.user;
				});
			}
			function remove( id , index ){
				UserFactory.remove( id , function(res){
					if(res.data.status){
						user.data.users.splice( index, 1 );
					}else{
						alert("failed to delete");
					}
				});
			}
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
					user.facilities_back = angular.copy(res.data.facilities);
					user.data.facilities.push({id:"",name:"All"});
					user.roles_backup = angular.copy(res.data.roles);
					user.data.roles.push({id:"",name:"All"});
				});
			}

		}
})();
