(function(){
	'use strict';
	angular
		.module('admDashboard')
        .factory('FacilityFactory',FacilityFactory);

        FacilityFactory.$inject = ['Server'];

        function FacilityFactory( Server ){
            var f = {};

            f.create = create;
            f.getAll = getAll;

            function getAll( k ){
                Server.get('facility/all').then(k , Server.error);
            }
            function create(data, k ){
                Server.post('facility/create',{facility:data}).then( k , Server.error );
            }

            return f;
        }

})();