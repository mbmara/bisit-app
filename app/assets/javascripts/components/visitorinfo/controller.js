// register new component dashboard filter
(function(){
  	angular
    	.module('admDashboard')
    	.controller("visitorInfoController", visitorInfoController);

    	visitorInfoController.$inject = ["VisitorInfo"];

    	function visitorInfoController( VisitorInfo ){

    		var vm = this;
    		vm.visitorinfo = VisitorInfo.initialize;
    		
    	}
})()
