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

						function info( id ){
							visitorFactory.info( id , function(res){
								visitor.modal = res.data;
								$("#visitorInfo").modal("show");
							});
						}
						UserFactory.initialize(state, function(permission){
							visitorFactory.all( function(res){
								visitor.lists = res.data;
							});
						});



		}
})();
