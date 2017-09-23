// register new component dashboard filter
(function(){
  	angular
    	.module('admDashboard')
    	.component('webCamera',{
        	templateUrl:'components/camera/view.html',
        	controller:'webCameraController'
      	});
})()
