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
		f.recovery_code = recovery_code;
		f.resetPassword = resetPassword;
		f.search = search;
		f.remove = remove;
		f.info = info;
		f.update = update;

		function update(user, k ){
			Server.post('user/update/'+user.id,{user:user}).then(k, Server.error);
		}
		function info( id , k ){
			Server.get('user/info/'+id).then( k , Server.error)
		}
		function remove( id , k ){
			Server.post('user/remove',{id:id}).then(k , Server.error);
		}
		function search(search, k ){
			Server.post('user/search',{search:search}).then(k , Server.error)
		}
		function resetPassword(data,k){
			Server.post('user/resetpassword',{email:data}).then(k , Server.error);
		}
		function recovery_code(data, k ){
			Server.post('user/recovery_code',{email:data}).then( k , Server.error);
		}
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
