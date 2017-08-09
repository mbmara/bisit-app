(function(){
	'use strict';
	angular
		.module('admDashboard')
        .factory('UserFactory',UserFactory);

        UserFactory.$inject = ['Server'];

        function UserFactory( Server ){
            var f = {};

            f.create = create;


            function create( user,k){
                Server.post('user/create',{user:user}).then(k,Server.error)
            }

            return f;
        }

})();