(function(){
	'use strict';
	angular
		.module('admDashboard')
		.factory('MenuFactory', MenuFactory);
        
        MenuFactory.$inject = [];

        function MenuFactory() {
            var f = {};
            
            f.menu={
                list:[
                    {Label:"Dashboard",route:"index",url:"index"},
                    {Label:"Companies",route:"index.company",url:"company"},
                    {Label:"User",route:"index.user",url:"user"},
                    {Label:"Visitors",route:"visitor",url:"visitors"},
                ]
            }
            
            return f;
      }
})();
