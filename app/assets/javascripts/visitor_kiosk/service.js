(function(){
	'use strict';
	angular
		.module('admDashboard')
        .factory('visitorFactory',visitorFactory);

        visitorFactory.$inject = ['Server'];

        function visitorFactory( Server ){
            var f = {};

            f.login = login;

            function login( data, k ){
                Server.post('visitor/login',{visit:data}).then(k ,Server.error);
            }

            return f;
        }

})();