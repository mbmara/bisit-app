(function(){
	'use strict';
	angular
		.module('admDashboard')
        .factory('CompanyFactory',CompanyFactory);

        CompanyFactory.$inject = ['Server'];

        function CompanyFactory( Server ){
            var f = {};

            f.create = create;
            f.getList = getList;

            function getList(k){
                Server.get('company/list').then(k,Server.error);
            }
            function create( company , k ){
                Server.post('company/create',{company:company}).then(k,Server.error)
            }

            return f;
        }

})();