(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('companyController',companyController);

		companyController.$inject = ['Notification','CompanyFactory','$state'];

		function companyController(Notification,CompanyFactory,$state){
            var company = this;
            company.mode = $state.current.name.split(".")[2] || "view";
            
            loadCompany();
            
            company.list = list;
            company.newCompany = newCompany;
            company.collections = [];
            company.loadCompany= loadCompany;

            function list(){
                company.mode = "view";
                $state.go("index.company");
            }
            function newCompany(){
                company.mode = "create";
                $state.go("index.company.create");
            }
            function loadCompany(){
                CompanyFactory.getList( function(res){
                    company.collections = res.data;
                });
            }
           
		}
})();