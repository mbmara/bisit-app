(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('visitorController',visitorController);

		visitorController.$inject = [];

		function visitorController(){
			var video = document.getElementById('video');
			if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			    // Not adding `{ audio: true }` since we only want video now
			    // navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
			    // 	// setTimeout(function(){
			    // 	// 	//console.log(window.URL);
			    // 	// 	video.src = window.URL.createObjectURL(stream);
			    //     // 	video.play();	
			    // 	// },1000);
			    //     // console.log(video);
			    // });
			}

		}
})();