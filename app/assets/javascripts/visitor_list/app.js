(function(){
	'use strict';
	angular
		.module('admDashboard')
		.config(['$stateProvider',routes]);

		function routes($stateProvider){

			$stateProvider
				.state("index.visitor-list",{
					url:"visitor-list",
					controller:'visitorListController',
					templateUrl:"visitor_list/index/view.html",
					controllerAs:'visitorList'
				})

		}
})();
