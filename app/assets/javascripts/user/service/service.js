(function(){
	'use strict';
	angular
		.module('admDashboard')
        .factory('UserFactory',UserFactory);

        UserFactory.$inject = ['Server'];

        function UserFactory( Server ){
            var f = {};

            f.create = create;
            f.getList = getList;
            f.roles = roles;
						f.login = login;
						f.authenticate = authenticate;
						f.logout = logout;
						f.initialize = initialize;

						function initialize(fn,callback){
						
							angular.forEach(f.permission.objects, function(data){

								//console.log(data);
								if(fn===data.url){
									callback(data);
									return false;
								}
							})
						}
						function logout(k){
							Server.post('user/logout').then(k,Server.error);
						}
						function authenticate(){
							return Server.post('user/authenticate');
						}
						function login( user, k ){
							Server.post('user/login',{user:user}).then(k , Server.error);
						}
            function roles( k ){
                Server.get('user/roles').then(k , Server.error)
            }
            function getList(k){
                Server.get('user/list').then(k,Server.error);
            }
            function create( user,k){
                Server.post('user/create',{user:user}).then(k,Server.error)
            }

            return f;
        }

})();
