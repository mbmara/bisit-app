(function(){
	'use strict';

	angular
		.module('admDashboard')
		.controller('indexController', indexController);

		indexController.$inject=['UserFactory','$state','UserAuth'];

		function indexController( UserFactory, $state,UserAuth){
			var index = this;
			console.log( " index " );
			
		}

})()
