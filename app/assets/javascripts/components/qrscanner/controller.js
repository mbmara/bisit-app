// register new component dashboard filter
(function(){
  angular
    .module('admDashboard')
    .controller("qrCameraController",qrCameraController);

    qrCameraController.$inject=['QRCamera'];

    function qrCameraController( QRCamera ){
    	
    	var vm = this;
    	
    	QRCamera.init( function(qr){
    		vm.qrcam = qr;
    	});
    }
})()
