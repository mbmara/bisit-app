(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('forgotpassController',forgotpassController);

		forgotpassController.$inject = ['UserFactory','Notification','$state','Server'];

		function forgotpassController(UserFactory,Notification,$state, Server){

      var forgot = this;

			forgot.stage = 1;
      forgot.data={

      }
      forgot.get_code = get_code;
			forgot.resetpass = resetpass;

			function resetpass(data){
				UserFactory.resetPassword(data, function(res){
					if(res.data.status){
						Notification.showSuccess(res.data.payload);
						forgot.data={};
						$state.go("login");
					}else{
						Notification.showError(res.data.payload);
					}
				})
			}
      function get_code( data ){
        UserFactory.recovery_code( data, function(res){
            if(res.data.status){
							forgot.stage = 2;
						}
        })
      }
		}
})();
