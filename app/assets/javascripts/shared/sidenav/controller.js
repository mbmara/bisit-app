(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('menuController',menuController);

		menuController.$inject = ['$state','$rootScope','UserFactory'];

		function menuController($state, $rootScope, UserFactory){
            var vm = this;
            $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
            	
                vm.active = toState.name.split(".")[1] || "index";

            });

            vm.active = $state.current.name.split(".")[1] || "index";
            vm.menus = UserFactory.permission.objects;
			vm.name = UserFactory.profile;
			vm.role = UserFactory.role;

			console.log("menu");
		}
})();
