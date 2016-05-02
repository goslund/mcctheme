angular.module('goopUi')
    .directive('goopUiHeight', ['$animate', function($animate) {
        return {
            restrict: 'A',
            require: ['^goopUiElement', 'goopUiHeight'],
            link: function(scope, element, attrs) {
            	
                scope.$watch('height', function(newVal) {
 					
                    // console.log("new height", newVal);
                    $animate.addClass(element, 'goop-height');


                })
            },
            controller: function($scope, $element, $timeout) {

            }
        }
    }]);
