(function(){
	'use strict';
	angular
		.module('admDashboard')
		.factory('BodyFactory',BodyFactory);

		BodyFactory.$inject = ['Server'];

		function BodyFactory( Server ){
            
            var f = {};

            f.statistics = statistics;

            function statistics( k ){

            	Server.get('statistics').then(k , Server.error );
            }

            return f;
		}
})();
