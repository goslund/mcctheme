	angular.module('goopMenuElement')
	    .directive('goopBlogMenuItem', function($rootScope, $state, $timeout) {
	        return {
	            restrict: 'A',
	            require: ['goopBlogMenuItem', '^goopMenuItem'],
	            scope: false,
	            link: function(scope, element) {
	            	element.on('click', function() {
	                    // console.log('click');
	                    // console.log($state.current.name);
	                    if ($state.current.name !== 'main.blog') {
	                        $rootScope.faded = true;
	                        $rootScope.$apply();

	                        $timeout(function() {

	                            var promise = $state.go('main.blog');

	                            promise.then(function(success) {
	                            	$rootScope.uiState = "open";
	                                $rootScope.faded = false;

	                            })
	                        }, 1000, false);

	                    }

	                })
	            },
	            controller: function($scope, $element) {
	            	$scope.myItem = {};
	            	$scope.myItem.icon="<i class='fa fa-book'></i>"
	            	// $scope.$apply();
	            }
	        }
	    })
