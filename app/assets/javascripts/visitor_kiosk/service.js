(function(){
	'use strict';
	angular
		.module('admDashboard')
        .factory('visitorFactory',visitorFactory);

        visitorFactory.$inject = ['Server'];

        function visitorFactory( Server ){
            var f = {};

            f.login = login;
						f.all = all;

						function all( k ){
							Server.get('visitor/all').then(k , Server.error);
						}
            function login( data, k ){
                Server.post('visitor/login',{visit:data}).then(k ,Server.error);
            }


            return f;
        }

})();
