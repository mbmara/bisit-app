(function(){
	'use strict';
	angular
		.module('admDashboard')
		.factory('Notification', Notification);
        
        Notification.$inject = ['notify'];

        function Notification(notify) {
            var f = {};
            
            f.showError = function( obj ){
                angular.forEach(obj, function(data,key){
                    notify({duration:5000,message:data+" "+key,position:'right',classes:'alert-error'});
                })
              
            }
            f.error = function(msg){
                notify({duration:5000,message:msg,position:'right',classes:'alert-error'});
            }
		    f.showSuccess = function( msg ){
      	        notify({duration:5000,message:msg,position:'right',classes:'alert-ok'});
            }
            return f;
      }
})();
