// register new component dashboard filter
(function(){
  	angular
    	.module('admDashboard')
    	.component('visitorInfo',{
        	templateUrl:'components/visitorinfo/view.html',
        	controller:'visitorInfoController'
      	});
})()
