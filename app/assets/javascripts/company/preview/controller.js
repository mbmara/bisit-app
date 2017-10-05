(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('companyPreviewController',companyPreviewController);

		companyPreviewController.$inject = ['Notification','CompanyFactory','$state'];

		function companyPreviewController(Notification,CompanyFactory,$state){
			var company_view = this;

			company_view.removeStaff = removeStaff;
			company_view.notifications=[
				{id:0,name:"Email"},
				{id:1,name:"SMS"}
			];

			var id = $state.params.id;
			company_view.changeNotification = changeNotification;



			CompanyFactory.getDetail( id , function(res){
				company_view.data = res.data.payload;
			});
			company_view.addStaff  = addStaff;

			function changeNotification(){
				CompanyFactory.updateNotification(company_view.data.id, company_view.data.notification, function(res){
					console.log(res);
				})
			}
			function removeStaff( staff_id, index){
				CompanyFactory.removeStaff( staff_id, id , function(res){
					company_view.data.staffs.splice(index,1);
				})
			}
			function addStaff(staff){
				staff.company_id = id;
				CompanyFactory.addStaff(staff , function(res){
					CompanyFactory.getDetail( id , function(res){
						company_view.data = res.data.payload;
						company_view.staff = {};
						$('#createStaff').modal('hide');
					});

				});
			}

		}
})();
