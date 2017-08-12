(function(){
	'use strict';
	angular
		.module('admDashboard')
        .factory('Scanner',Scanner);

        Scanner.$inject = [];

        function Scanner( ){
            var f = {};

            f.instance = {};

            f.init = init;
            f.running = false;
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