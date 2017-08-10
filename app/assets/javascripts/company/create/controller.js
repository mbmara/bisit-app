(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('companyCreateController',companyCreateController);

		companyCreateController.$inject = ['Notification','CompanyFactory'];

		function companyCreateController(Notification,CompanyFactory){
            var company_create = this;
            company_create.data={
                tags:[]
            }
            
           
            company_create.addtag = addtag;
            company_create.removeTag = removeTag;
            company_create.create = create;

            function create(data){
                CompanyFactory.create( data, function(res){
                    console.log(res);
                });
            }
            function removeTag(index){
                company_create.data.tags.splice(index,1);
            }
            function addtag(tag){
                if(tag=="" || typeof tag=='undefined'){
                    Notification.error("Empty Tag not allowed");
                    return false;
                }
                company_create.data.tags.push(tag);
                company_create.temp.tag = "";
            }
		}
})();