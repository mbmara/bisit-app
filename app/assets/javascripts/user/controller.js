(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('userController',userController);

		userController.$inject = ['UserFactory'];

		function userController(UserFactory){
            	var user = this;
            
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
				});
			}

		}
})();