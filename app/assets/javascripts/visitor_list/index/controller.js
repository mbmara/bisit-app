(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('visitorListController',visitorListController);

		visitorListController.$inject = ['Notification','$state','UserFactory','visitorFactory','$timeout','$scope'];

		function visitorListController(Notification,$state, UserFactory,visitorFactory,$timeout, $scope ){
            var visitorList = this;
            visitorList.attachId = attachId;
            visitorList.approve = approve;
            visitorList.deny = deny;

            visitorFactory.quelist( function(res){
            	visitorList.collections = res.data.visitors;
            });

            visitorList.info = info;
            visitorList.confirmQrCode = confirmQrCode;
            visitorList.cancelQrCode = cancelQrCode;


            // delete qr code
            function cancelQrCode(){
                  
                  $("#qrCamera99").modal("hide");
                  $("#visitorInformationA").modal("show");
                  delete visitorList.info.identifiction_code;


            }
            //attach code
            function confirmQrCode(){
                  if(visitorList.data.info.identifiction_code){
                        $("#qrCamera99").modal("hide");
                        $("#visitorInformationA").modal("show");      
                  }else{
                        alert("Please Scan or Enter Code");
                  }
                  
            }
            var qrcamera;
            function attachId(){
                  $("#visitorInformationA").modal("hide");
                  $("#qrCamera99").modal("show");
                  $timeout( function(){
                        qrcamera = new Instascan.Scanner({ video: document.getElementById('qrcam99') ,mirror:false,backgroundScan:false});
                  
                        Instascan.Camera.getCameras().then(function (cameras) {
                              visitorList.qrcams = cameras;
                              if (cameras.length > 0) {
                                    (cameras.length>1) ? qrcamera.start(cameras[1]) : qrcamera.start(cameras[0]);
                              
                          } else {
                            console.error('No cameras found.');
                          }

                      }).catch(function (e) {
                          console.error(e);
                      });
                      qrcamera.addListener('scan', function (content) {
                              visitorList.data.info.identifiction_code = content;
                              $scope.$apply();
                        });
                      

                  },300)
            }

            function approve(){
                  alert("not yet implemented");
            }

            function deny(){
                  alert("not yet implemented    ");
            }

            function info( id ){
            	visitorFactory.info( id , function(res){
                        console.log(res);
            		visitorList.data = res.data;
            	})
            	$("#visitorInformationA").modal("show");
            }

		}
})();
