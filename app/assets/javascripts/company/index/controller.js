(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('companyController',companyController);

		companyController.$inject = ['Notification','CompanyFactory','$state','FacilityFactory','UserFactory'];

		function companyController(Notification,CompanyFactory,$state,FacilityFactory, UserFactory){
            var company = this;
						var state = $state.current.name.split(".")[1] || "index"
						company.mode ="create";

						UserFactory.initialize(state, function(permission){
							company.access_level = UserFactory.access;
							company.list = list;
				            company.collections = [];
				            company.loadCompany= loadCompany;
							company.permission = permission;
							company.remove = remove;
							company.addtag = addtag;
							company.removeTag = removeTag;
							company.create = create;
							company.search = search;

							company.edit = edit;
							company.update = update;

							loadCompany();
						});

						function search(str){
							CompanyFactory.search( str, function(res){
								company.collections = res.data.companies;
							})
						}
						function update(){
							CompanyFactory.update(company.data, function(res){
								$('#createCompany').modal('hide');
								company.mode ="create";
								loadCompany();
							})
						}
						function edit(id){
							company.mode ="edit";
							CompanyFactory.getDetail(id, function(res){
								company.data = res.data.payload;
								$('#createCompany').modal('show');
							});

						}
						function remove(id,index){
							CompanyFactory.remove( id , function(res){
								console.log(res);
								if(res.data.status){
									company.collections.splice( index, 1);
								}else{
									Notification.showError(res.data.payload);
								}
							});
						}
            company.data={
                tags:[]
            }



            function create(data){
                CompanyFactory.create( data, function(res){
										if(res.data.status){
											CompanyFactory.getList( function(res){
													company.collections = res.data.companies;
													company.facilities = res.data.facilities;
													company.data = {};
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
