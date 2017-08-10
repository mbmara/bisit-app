(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('companyPreviewController',companyPreviewController);

		companyPreviewController.$inject = ['Notification','CompanyFactory','$state'];

		function companyPreviewController(Notification,CompanyFactory,$state){
            
		}
})();