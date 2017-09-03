(function(){
	'use strict';
	angular
		.module('admDashboard')
		.controller('identificationCreateController',identificationCreateController);

		identificationCreateController.$inject = ['$interval','$timeout','$scope','Scanner','IdentificationFactory','Notification','$state'];

		function identificationCreateController( $interval, $timeout, $scope,Scanner,IdentificationFactory,Notification, $state ){

			var identificationCreate = this;
			identificationCreate.back = back;

			
			IdentificationFactory.getAll( function(res){
				identificationCreate.facilities = res.data.facilities;
			});
			identificationCreate.data={
				serial:""
			};

			function back(){
				$state.go("index.identification",{},{reload:true});
			}
			identificationCreate.newSerial = function(){
				IdentificationFactory.create(identificationCreate.data, function(res){
					if(res.data.status){
						Notification.showSuccess(res.data.payload);
					}else{
						Notification.showError(res.data.payload);
					}
				})
			}
			$timeout( function(){
				Scanner.init( new Instascan.Scanner({ video: document.getElementById('preview') }) );

				Scanner.instance.addListener('scan', function (content) {
					identificationCreate.data.serial = content;
					$scope.$apply();
				});

			},1000)
		}
})();
