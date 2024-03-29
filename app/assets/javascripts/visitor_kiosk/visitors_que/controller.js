(function(){
  'use strict';
  angular
  .module('admDashboard')
  .controller('visitorsqueController', visitorsqueController);

  visitorsqueController.$inject=['visitorFactory','$timeout','VisitorInfo','QRCamera','Notification'];

  function visitorsqueController(visitorFactory, $timeout,VisitorInfo,QRCamera,Notification){
    var visitors_que = this,timer,params={};

    visitors_que.qrcamera_window    = false;
    visitors_que.visitorInfo_window = false;
    visitors_que.info = info;

    VisitorInfo.close = function(){
      visitors_que.visitorInfo_window = false;
      getList();
    }
    VisitorInfo.attach = function(){
      visitors_que.visitorInfo_window = false; 
      visitors_que.qrcamera_window    = true;
    }
    VisitorInfo.reject = function( id ){
      params.id = id;
      visitorFactory.reject( params ,  function(res){
        if(res.data.status){
          visitors_que.visitorInfo_window = false;
          Notification.showSuccess("Visitor is rejected");
          getList();
        }else{
          Notification.showError(res.data.payload);
        }
      })
    }
    VisitorInfo.approve = function( id ){
      params.id = id;
      if(params.identifiction_code){
        visitors_que.visitorInfo_window = false;
        visitorFactory.approve( params ,  function(res){
          if(res.data.status){
            Notification.showSuccess("Visitor is now login");
            getList();
          }else{
            Notification.showError(res.data.payload);
          }
        })
      }else{
        alert("Please Attach Identification");
      }
       
      
    }
    QRCamera.cancel = function(){
      visitors_que.visitorInfo_window = true; 
      visitors_que.qrcamera_window    = false; 
    }
    QRCamera.confirm = function(data){
      visitors_que.visitorInfo_window = true; 
      visitors_que.qrcamera_window    = false;
      params.identifiction_code = data;
    }


    function info( id ){
      $timeout.cancel(timer);
      visitorFactory.info( id , function(res){
        visitors_que.visitorInfo_window = true;
        VisitorInfo.init(res.data);
      })
    }


    function getList(){
      visitorFactory.quelist( function(res){
        visitors_que.collections = res.data.visitors;
        timer = $timeout(function(){
          getList();
        },5000);
      });  

    }
    getList();


//     
//     visitors_que.info = info;
//     visitors_que.confirmQrCode = confirmQrCode;
//     visitors_que.cancelQRCamera = cancelQRCamera;
//     visitors_que.attachId = attachId;
//     visitors_que.approve = approve;
//     visitors_que.deny = deny;
//     visitors_que.closeModal = closeModal;

//     function closeModal(){
//       $("#visitorInformationB").modal("hide");
//       getList();
//     }



//     function cancelQRCamera(){
//       qrcamera.stop();
//       $("#qrCamera99B").modal("hide");
//       $("#visitorInformationB").modal("show");
//       delete visitors_que.info.identifiction_code;


//     }
// //attach code
// function confirmQrCode(){
//   qrcamera.stop();
//   if(visitors_que.data.info.identifiction_code){
//     $("#qrCamera99B").modal("hide");
//     $("#visitorInformationB").modal("show");      
//   }else{
//     alert("Please Scan or Enter Code");
//   }

// }
// var qrcamera;
// function attachId(){
//   $("#visitorInformationB").modal("hide");
//   $("#qrCamera99B").modal("show");
//   $timeout( function(){
//     qrcamera = new Instascan.Scanner({ video: document.getElementById('qrcam99B') ,mirror:false,backgroundScan:false});

//     Instascan.Camera.getCameras().then(function (cameras) {
//       visitors_que.qrcams = cameras;
//       if (cameras.length > 0) {
//         (cameras.length>1) ? qrcamera.start(cameras[1]) : qrcamera.start(cameras[0]);

//       } else {
//         console.error('No cameras found.');
//       }

//     }).catch(function (e) {
//       console.error(e);
//     });
//     qrcamera.addListener('scan', function (content) {
//       visitors_que.data.info.identifiction_code = content;
//       $scope.$apply();
//     });


//   },300)
// }

// function approve(){
//   if(visitors_que.data.info.identifiction_code){
//     var payload={
//       id:visitors_que.data.info.id,
//       identifiction_code:visitors_que.data.info.identifiction_code
//     }

//   }else{
//     alert("Please attach Identification Card");
//   }
// }

// function deny(){
//   alert("not yet implemented    ");
// }



  }
})()