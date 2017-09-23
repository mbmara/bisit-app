// register new component dashboard filter
(function(){
  	angular
    	.module('admDashboard')
    	.component('qrCamera',{
        	templateUrl:'components/qrscanner/view.html',
        	controller:'qrCameraController'
      	});
})()
