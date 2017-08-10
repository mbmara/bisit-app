(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('companyController',companyController);

		companyController.$inject = ['Notification','CompanyFactory','$state'];

		function companyController(Notification,CompanyFactory,$state){
            var company = this;

            company.mode = CompanyFactory.mode;
            loadCompany();
           
            company.collections = [];
            company.loadCompany= loadCompany;
           
            function loadCompany(){
                CompanyFactory.getList( function(res){
                    company.collections = res.data;
                });
            }
           
		}
})();