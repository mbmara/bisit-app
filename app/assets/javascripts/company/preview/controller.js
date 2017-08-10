(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('companyPreviewController',companyPreviewController);

		companyPreviewController.$inject = ['Notification','CompanyFactory','$state'];

		function companyPreviewController(Notification,CompanyFactory,$state){
			var company_view = this;
			
			var id = $state.params.id;

			CompanyFactory.getDetail( id , function(res){
				company_view.data = res.data.payload;
			});
			company_view.addStaff  = addStaff;


			function addStaff(staff){
				staff.company_id = id;
				CompanyFactory.addStaff(staff , function(res){
					console.log(res);
				});
			}

		}
})();