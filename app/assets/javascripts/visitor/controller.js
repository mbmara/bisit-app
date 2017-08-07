(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('visitorController',visitorController);

		visitorController.$inject = [];

		function visitorController(){

			// navigator.getMedia = ( navigator.getUserMedia ||
   //                     navigator.webkitGetUserMedia ||
   //                     navigator.mozGetUserMedia ||
   //                     navigator.msGetUserMedia);

			//   // Checks if getUserMedia is available on the client browser
			//   window.hasUserMedia = function hasUserMedia() {
			//     return navigator.getMedia ? true : false;
			//   };

			//  console.log(window.hasUserMedia());
			var video = document.getElementById('video');

// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
    });
}

		}
})();