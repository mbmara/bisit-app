(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('visitorListController',visitorListController);

		visitorListController.$inject = ['Notification','$state','UserFactory','visitorFactory'];

		function visitorListController(Notification,$state, UserFactory,visitorFactory){
            var visitorList = this;
            
            visitorFactory.quelist( function(res){
            	visitorList.collections = res.data.visitors;
            });

            visitorList.info = info;


            function info( id ){
            	visitorFactory.info( id , function(res){
                        console.log(res);
            		visitorList.data = res.data;
            	})
            	$("#visitorInformationA").modal("show");
            }

		}
})();
