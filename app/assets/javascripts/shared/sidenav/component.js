(function(){
	'use strict';

	angular
		.module('admDashboard')
		.component('adminSidenav',{
			controller:"menuController",
			templateUrl:'shared/sidenav/view.html'
		});
})()