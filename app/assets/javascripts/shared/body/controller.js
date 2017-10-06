(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('bodyController',bodyController);

		bodyController.$inject = ['BodyFactory'];

		function bodyController( BodyFactory ){
            
            var vm = this;
            
            BodyFactory.statistics( function(res){
            	vm.data = res.data.payload;
            });

		}
})();
