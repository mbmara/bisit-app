// register new component dashboard filter
(function(){
  	angular
    	.module('admDashboard')
    	.factory("WebCamera",WebCamera);
		
		WebCamera.$inject=['$timeout'];

    	function WebCamera( $timeout ){
    		var f ={
    			prototype:{
    				devices:[],
    				open:open,
                    capture:capture,
                    visitor_img:null,
                    preview:false,
                    retake:retake,
                    confirm:confirm,
                    cancel:cancel,
                    switchDevice:switchDevice
    			},
    			initialize:initialize,
    			config:{ 
    				defaultPosition:0
    			},
                destroy:destroy

    		},
    		stream,
            snapshot,
            video;
    		return f;
            function destroy(){
                f.prototype.visitor_img = null;
                f.prototype.preview = false;
            }
            function switchDevice( index ){
                stopCamera();
                open( index );

            }
            function cancel(){
                stopCamera();
                f.prototype.preview = false;
                f.prototype.visitor_img = null;
                if( typeof f.cancel =='function') f.cancel();
            }
            function confirm(){
                if( typeof f.confirm =='function') f.confirm(f.prototype.visitor_img);
                stopCamera();
            }

            function retake(){
                f.prototype.preview = false;
                //open();
            }
            function capture(){
                $timeout( function(){
                    var canvas = document.getElementById('webcanvass');
                    var context = canvas.getContext('2d');
                    context.drawImage(video, 0, 0, 350, 262);
                    f.prototype.visitor_img = canvas.toDataURL();
                    f.prototype.preview = true;
                   // stopCamera();
                },300)
            }
            function stopCamera(){
                stream.getTracks().forEach(function(track) {
                    track.stop();
                });
            }
    		function initialize( onReady ){
                console.log("ss");
                //delete f.prototype.visitor_img;
                f.prototype.devices.length = 0;
				navigator.mediaDevices.enumerateDevices().then(gotDevices); //.then(getStream).catch(handleError);
                function gotDevices(deviceInfos) {
                    
                    angular.forEach(deviceInfos, function(data){
                        if (data.kind === 'videoinput') {
                            f.prototype.devices.push(data.deviceId);
                        }
                    })
                    $timeout( function(){
                      onReady( f.prototype );     
                    });    
                }

                
                
    		}
    		function open( deviceId ){
    			$timeout( function(){
                	video  = document.getElementById('webcamera');
                	var constraints = {
	                    video: {
	                      optional: [{
	                        sourceId: (deviceId) ?  deviceID : f.prototype.devices[f.config.defaultPosition]
	                      }]
	                    }
	                };
                	navigator.mediaDevices.getUserMedia(constraints).then(function(_stream) {
						stream = _stream;
						video.src = window.URL.createObjectURL(stream);
						video.play();
					},100);
					
                })
    		}
    	}
})()
