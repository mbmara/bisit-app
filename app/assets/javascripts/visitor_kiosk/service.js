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
						f.logout = logout;
						f.info = info;
						f.find = find;

						function find(str, k ){
							Server.post('visitor/find',{search:str}).then(k , Server.error );
						}
						function info(id, k){
							Server.post('visitor/info',{id:id}).then( k , Server.error );
						}
						function logout( code , k ){
							Server.post('visitor/logout',{code:code}).then( k , Server.error);
						}
						function all( k ){
							Server.get('visitor/all').then(k , Server.error);
						}
            function login( data, k ){
                Server.post('visitor/login',{visit:data}).then(k ,Server.error);
            }


            return f;
        }

})();
