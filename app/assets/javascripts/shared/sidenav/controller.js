(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('menuController',menuController);

		menuController.$inject = ['MenuFactory','$state','$rootScope'];

		function menuController( MenuFactory, $state, $rootScope){
            var vm = this;
            $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
                vm.active = toState.name.split(".")[1] || "index";
            });
            vm.active = $state.current.name.split(".")[1] || "index";
            vm.menus = MenuFactory.menu;
		}
})();