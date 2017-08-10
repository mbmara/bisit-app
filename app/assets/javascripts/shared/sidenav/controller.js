(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('menuController',menuController);

		menuController.$inject = ['MenuFactory','$state','$rootScope'];

		function menuController( MenuFactory, $state, $rootScope){
            var vm = this;
            $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
                //validation here
                vm.active = toState.name.split(".")[1] || "index";
            });
            vm.active = $state.current.name.split(".")[1] || "index";

            console.log(vm.active);
            vm.menus = MenuFactory.menu;
		}
})();