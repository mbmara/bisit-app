(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('companyController',companyController);

		companyController.$inject = ['Notification'];

		function companyController(Notification){
            var company = this;
            
            company.addtag = addtag;
            company.removeTag = removeTag;
            company.create = create;
            
            company.data={
                name: "Getz Clinical Ltd",
                unit_number:'RN 1',
                floor:41,
                website:'www.getzclinical.com',
                description:'Health Care Solution',
                tags:["Health","Bio Medical","Analytics"]
            }

            function create(company){
                console.log( company );
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
		}
})();