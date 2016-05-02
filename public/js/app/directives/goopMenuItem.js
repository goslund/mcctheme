	angular.module('goopMenuElement')
	    .directive('goopMenuItem', function($sce) {
	        return {
	            restrict: 'E',
	            templateUrl: '/js/angular/directives/html/GoopMenuItem.html',
	            require: "goopMenuItem",
	            scope: true,
	            link: function(scope, element) {

	                element.on('click', function() {
	                    scope.$emit('closeNav');

	                })
	            },
	            controller: function($scope, $element) {
	                $scope.$watch('myItem', function(newVal) {
	                    if (typeof newVal !== "undefined" && typeof newVal.icon !== 'undefined') {


	                        $scope.icon = $sce.trustAsHtml(newVal.icon);

	                    }
	                })


	 
	            }
	        }
	    })
