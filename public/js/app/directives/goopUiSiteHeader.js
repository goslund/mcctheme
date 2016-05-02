angular.module('goopUi')
    .directive('goopUiSiteHeader', function() {
        return {
            restrict: 'E',
            template: '<div ng-transclude></div>',
            transclude: true,
            scope: {
                state: "="
            },
            link: function(scope) {
            	console.log(scope);
            },
            controller: function($scope, $element, $timeout) {
            	console.log($scope);
            	console.log('header', $scope.state);
            	$scope.$watch('state', function(newVal) {
                	if (newVal === "scrunched") {
                		$element.removeClass('open').addClass('scrunched');
                	} else if (newVal === "open") {
                		$element.removeClass('scrunched').addClass('open');
                	}
                	
                	// $scope.$apply();
            	})
            }
        }
    });
