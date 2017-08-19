(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('companyController',companyController);

		companyController.$inject = ['Notification','CompanyFactory','$state','FacilityFactory','UserFactory'];

		function companyController(Notification,CompanyFactory,$state,FacilityFactory, UserFactory){
            var company = this;
						var state = $state.current.name.split(".")[1] || "index"

						UserFactory.initialize(state, function(permission){
							company.access_level = UserFactory.access;
							company.list = list;
	            company.collections = [];
	            company.loadCompany= loadCompany;
							company.permission = permission;

							FacilityFactory.getAll( function(res){
	                company.facilities = res.data;

	            });
							loadCompany();
						});


            company.data={
                tags:[]
            }

            company.addtag = addtag;
            company.removeTag = removeTag;
            company.create = create;

            function create(data){
                CompanyFactory.create( data, function(res){
										if(res.data.status){
											CompanyFactory.getList( function(res){
													company.collections = res.data.companies;
	                        $('#createCompany').modal('hide');
	                    });
										}else{
											Notification.showError(res.data.payload);
										}

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
										company.facilities = res.data.facilities;
                    company.collections = res.data.companies;
                });
            }

		}
})();
