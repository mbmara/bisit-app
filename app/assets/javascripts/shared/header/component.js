(function(){
	'use strict';

	angular
		.module('admDashboard')
		.component('adminHeader',{
			controller:['UserFactory','$state', function( UserFactory, $state ){
				var vm = this;

				vm.logout = function(){
					UserFactory.logout( function(res){
						$state.go("login");
					});
				}
			}],
			templateUrl:'shared/header/view.html'
		});


})()
