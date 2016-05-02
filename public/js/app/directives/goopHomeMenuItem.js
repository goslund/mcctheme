	angular.module('goopMenuElement')
	    .directive('goopHomeMenuItem', function($rootScope, $state, $timeout) {
	        return {
	            restrict: 'A',
	            require: ['^goopMenuItem', 'goopHomeMenuItem'],
	            link: function(scope, element) {

	                element.on('click', function() {
	                    // 
	                    if ($state.current.name !== 'main.home') {
	                        $rootScope.faded = true;
	                        $rootScope.$apply();

	                        $timeout(function() {

	                            var promise = $state.go('main.home');

	                            promise.then(function(success) {
	                                $rootScope.faded = false;
	                                $rootScope.uiState = "scrunched";

	                            })
	                        }, 1000, false);

	                    }

	                })
	            },
	            controller: function($scope, $element, $sce) {
	                $scope.myItem = {};
	                $scope.myItem.icon="<i class='fa fa-home'></i>"

	            }
	        }
	    })
