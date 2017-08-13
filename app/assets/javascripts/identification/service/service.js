(function(){
	'use strict';
	angular
		.module('admDashboard')
        .factory('IdentificationFactory',IdentificationFactory);

        IdentificationFactory.$inject = ['Server'];

        function IdentificationFactory( Server ){
            var f = {};

            f.create = create;
            f.getAll = getAll;

            function getAll( k ){
                console.log("getting..");
                Server.get('identification/all').then(k,Server.error);
            }
            function create( code , k ){
                Server.post('identification/create',{code:code}).then(k,Server.error)
            }

            return f;
        }

})();