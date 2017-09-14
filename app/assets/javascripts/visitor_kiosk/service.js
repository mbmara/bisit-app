(function(){
	'use strict';
	angular
		.module('admDashboard')
        .factory('visitorFactory',visitorFactory);

        visitorFactory.$inject = ['Server'];

        function visitorFactory( Server ){
            var f = {};

            f.login = login;
            f.login2 = login2;
			f.all = all;
			f.logout = logout;
			f.info = info;
			f.find = find;
			f.relogin = relogin;
			f.search = search;
			f.verify = verify;
			f.quelist = quelist;

			function quelist( k ){
				Server.get('visitor/quelist').then( k , Server.error );
			}
			function verify( code , k ){
				Server.post('visitor/verify',{code:code}).then(k , Server.error );
			}
			function search(filter,k){
				Server.post('visitor/search',{search:filter}).then(k, Server.error);
			}
			function relogin(data,k){
				Server.post('visitor/relogin',{visitor:data}).then(k, Server.error)
			}
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
            function login2(data, k ){
            	Server.post('visitor/login2',{visit:data}).then(k ,Server.error);	
            }

            return f;
        }

})();
