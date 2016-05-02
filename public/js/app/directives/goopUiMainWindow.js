angular.module('goopUi')

    .directive('goopUiMainWindow', function() {
        return {
            restrict: 'E',
            transclude: true,
            priority: 1500,
            scope: {
                state: "=",
                faded: "="
            },
            compile: function( tElement, tAttributes) {
            	// console.log("Container at compile:", tElement.html());
            },
            link: function(scope, element, attribute, _c, transclude) {
                // console.log("Link Transclude!!", transclude);
                transclude(function injectLinkedClone(clone) {
                	console.log("clone", clone);
                	element.append(clone);
       	         });
            },
            controller: function($scope, $element, $timeout) {
                
                $scope.$watch('faded', function(newVal) {
                
                    if (newVal === false) {
                        $element.css({
                        	'transition-property': 'all',
                        	'transition-duration': '1s',
                        	'opacity': 1
                        })
                        $element.bind('transitionend', function(data) {
                        	
                        	$(this).unbind();
                        })
                    } else {
                        $element.css({
                        	'transition-property':'all',
                        	'transition-duration': '1s',
                        	'opacity': 0
                        })
                    }
                })

                $scope.$watch('state', function(newVal) {
                
                    if (newVal === "scrunched") {
                        $element.removeClass('open').addClass('scrunched');
                        $element.bind('transitionend', function(data) {
                        	// 
                        	$element.removeClass('scrunched');
                        	$(this).unbind();
                        })
                    } else if (newVal === "open") {
                        $element.removeClass('scrunched').addClass('open');
                    }

                    // $scope.$apply();
                })
            }
        }
    });
