(function(){
	'use strict';
	angular
		.module('admDashboard')
        .factory('Scanner',Scanner);

        Scanner.$inject = [];

        function Scanner( ){
            var f = {};

            f.instance = {};
            f.enumDeviceCamera = enumDeviceCamera;
            f.init = init;
            f.running = false;
            f.devices = [];
            f.stopCamera = stopCamera;

            function stopCamera(){
                if (window.stream) {
                    window.stream.getTracks().forEach(function(track) {
                      track.stop();
                    });
                }   
            }
            function enumDeviceCamera( k ){
                var camera = [];
                navigator.mediaDevices.enumerateDevices().then(gotDevices); //.then(getStream).catch(handleError);
                function gotDevices(deviceInfos) {
                    angular.forEach(deviceInfos, function(data){
                        if (data.kind === 'videoinput') {
                            f.devices.push(data.deviceId);
                        }
                    })
                    k(f.devices);
                    
                }
                // function getStream() {
                  

                //   var constraints = {
                   
                //     video: {
                //       optional: [{
                //         sourceId: videoSelect.value
                //       }]
                //     }
                //   };

                //   navigator.mediaDevices.getUserMedia(constraints).
                //     then(gotStream).catch(handleError);
                // }
                // function gotStream(stream) {
                //   window.stream = stream; // make stream available to console
                //   videoElement.srcObject = stream;
                // }
                // function handleError(error) {
                //   console.log('Error: ', error);
                // }
            }
            function init( obj ){
            	f.running = true;
            	f.instance = obj;
            	Instascan.Camera.getCameras().then(function (cameras) {
				if (cameras.length > 0) {
					f.instance.start(cameras[0]);
				} else {
					console.error('No cameras found.');
				}
				}).catch(function (e) {
					console.error(e);
				});
            }


            return f;
        }

})();