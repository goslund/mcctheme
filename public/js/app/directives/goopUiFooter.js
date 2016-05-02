angular.module('goopUi')
    .directive('goopUiFooter', function() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/js/angular/directives/html/GoopUiFooter.html',
            scope: {
                state: "="
            },
            controller: function($scope, $element, $timeout) {
                
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
