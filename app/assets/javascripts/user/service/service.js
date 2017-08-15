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