(function(){
	'use strict';

	angular
		.module('admDashboard')
		.controller('indexController', indexController);

		indexController.$inject=['UserFactory','$state'];

		function indexController( UserFactory, $state){
			var index = this;
			UserFactory.authenticate().then(
				//success
				function(res){
					if(res.data.status){

					}else{
						$state.go("login");
					}
				},
				//error
				function(){

				}
			)
		}

})()
