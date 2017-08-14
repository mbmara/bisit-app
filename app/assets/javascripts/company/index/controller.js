(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('companyController',companyController);

		companyController.$inject = ['Notification','CompanyFactory','$state','FacilityFactory'];

		function companyController(Notification,CompanyFactory,$state,FacilityFactory){
            var company = this;
            
            
            loadCompany();
            
            company.list = list;
            company.collections = [];
            company.loadCompany= loadCompany;

            FacilityFactory.getAll( function(res){
                company.facilities = res.data;
            });
            company.data={
                tags:[]
            }
            
            company.addtag = addtag;
            company.removeTag = removeTag;
            company.create = create;

            function create(data){
                CompanyFactory.create( data, function(res){
                    CompanyFactory.getList( function(res){
                        company.collections = res.data;
                        $('#createCompany').modal('hide');
                    });
                });
            }
            function removeTag(index){
                company.data.tags.splice(index,1);
            }
            function addtag(tag){
                if(tag=="" || typeof tag=='undefined'){
                    Notification.error("Empty Tag not allowed");
                    return false;
                }
                company.data.tags.push(tag);
                company.temp.tag = "";
            }

            function list(){
                company.mode = "view";
                $state.go("index.company");
            }
           
            function loadCompany(){
                CompanyFactory.getList( function(res){
                    company.collections = res.data;
                });
            }
           
		}
})();