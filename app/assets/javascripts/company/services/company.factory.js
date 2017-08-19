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
            f.getDetail  = getDetail;
            f.addStaff = addStaff;
            f.getStaff = getStaff;
						f.remove = remove;
						f.update = update;
						f.search = search;

						function search( str,k ){
							Server.post('company/search',{search:str}).then( k, Server.error);
						}
						function update(data, k){
							Server.post('company/update',{company:data}).then( k , Server.error);
						}
						function remove( id, k ){
							Server.post('company/remove',{id:id}).then( k , Server.error);
						}
            function getStaff(id,k){
                Server.post('company/staff',{id:id}).then(k,Server.error)
            }
            function addStaff(staff, k ){
                Server.post('company/addstaff',{staff:staff}).then(k, Server.error);
            }
            function getDetail(id,k){
                Server.get('company/detail/'+id).then(k,Server.error);
            }
            function getList(k){
                Server.get('company/list').then(k,Server.error);
            }
            function create( company , k ){
                Server.post('company/create',{company:company}).then(k,Server.error)
            }

            return f;
        }

})();
