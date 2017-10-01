// register new component dashboard filter
(function(){
  	angular
    	.module('admDashboard')
    	.factory('VisitorInfo',VisitorInfo);

    	VisitorInfo.$inject=[];

    	function VisitorInfo(){

    		var f = {
    			initialize:{
    				attach:attach,
    				approve:approve,
    				reject:reject,
    				close:close,
    				data:{}
    			},
    			init:init
    		};

    		function attach(){
    			if( typeof( f.attach )=='function' ) f.attach();
    			
    		}
    		function approve(){
    			if( typeof( f.approve )=='function' ) f.approve(f.initialize.data.id);
    			
    		}
    		function reject(){
    			if( typeof( f.reject )=='function' ) f.reject();
    			
    		}
    		function close(){
    			if( typeof( f.close )=='function' ) f.close();
    		
    		}
    		function init(data){
    			f.initialize.data = data.info;
            }
    		return f;
    	}
})()
