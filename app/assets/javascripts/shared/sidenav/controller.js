(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('menuController',menuController);

		menuController.$inject = ['MenuFactory','$state','$rootScope','Scanner'];

		function menuController( MenuFactory, $state, $rootScope, Scanner){
            var vm = this;
            $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
            	if(Scanner.running){
	            	Scanner.instance.stop();
	            }
                vm.active = toState.name.split(".")[1] || "index";
            });
            vm.active = $state.current.name.split(".")[1] || "index";
            vm.menus = MenuFactory.menu;
		}
})();