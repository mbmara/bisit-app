(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('visitorController',visitorController);

		visitorController.$inject = ['Notification','$state','UserFactory','visitorFactory'];

		function visitorController(Notification,$state, UserFactory,visitorFactory){
            var visitor = this;
            var state = $state.current.name.split(".")[1] || "index"

			visitor.info =info;
			visitor.search = search;

			function search(filter){
				visitorFactory.search( filter, function(res){
					console.log(res);
					visitor.data.visitors = res.data.visitors;
				});
			}
			function info( id ){
				visitorFactory.info( id , function(res){
					visitor.modal = res.data;
					$("#visitorInfo").modal("show");
				});
			}
			visitor.filter={
				facility:"",
				company:"",
				status:""
			}
			UserFactory.initialize(state, function(permission){
				visitorFactory.all( function(res){
					
					visitor.data = res.data;
					visitor.data.states=[
						{value:0,label:"log In"},
						{value:1,label:"log Out"},
						{value:"",label:"All"}
					]
					visitor.data.facilities.push({id:"", name:"All"})
					visitor.data.companies.push({id:"", name:"All"})
				});
			});



		}
})();
