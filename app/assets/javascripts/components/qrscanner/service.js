// register new component dashboard filter
(function(){
  angular
    .module('admDashboard')
    .factory("QRCamera",QRCamera);

    QRCamera.$inject=['$timeout'];

    function QRCamera( $timeout ){
    	
    	var f={
    		prototype:{
                code:null,
                cameras:[],
                qrcamera:{},
                cancel:_cancel,
                confirm:_confirm
            },
    		init:init,
    		config:{
    			defaultPosition:0
    		},
    	}

    	function init( onReady ){
    		$("#qrCamera").modal("show");
			$timeout( function(){
				f.prototype.qrcamera = new Instascan.Scanner({ video: document.getElementById('qrcam') ,mirror:false,backgroundScan:false});
			
				Instascan.Camera.getCameras().then(function (cameras) {
					f.prototype.cameras = cameras;
					if (f.prototype.cameras.length > 0) {
						f.prototype.qrcamera.start(f.prototype.cameras[f.config.defaultPosition])
                        onReady(f.prototype);
			        } else {
			          	console.error('No cameras found.');
			        }

			    }).catch(function (e) {
			        console.error(e);
			    });
                f.prototype.qrcamera.addListener('scan', function (content) {
                    f.prototype.code = content;
                });
			    
			},300)
    	}
    	
        function _cancel(){
            f.prototype.qrcamera.stop();
            if(typeof f.cancel === "function") f.cancel();
        }

        function _confirm(){
            f.prototype.qrcamera.stop(f.prototype);
            if(typeof f.confirm === "function") f.confirm(f.prototype.code);
        }
        return f;

    }
})()
