// register new component dashboard filter
(function(){
  	angular
    	.module('admDashboard')
    	.controller("webCameraController",webCameraController);

    	webCameraController.$inject=['WebCamera'];

    	function webCameraController(WebCamera){
    		var vm = this;
    		WebCamera.initialize( function(cam){
    			vm.webcam = cam;
                vm.webcam.open();
    		});
    	}
})()
