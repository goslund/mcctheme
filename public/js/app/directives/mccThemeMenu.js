	angular.module('mccTheme')
	    .directive('mccThemeMenu', function() {
	        return {
	            restrict: 'E',
	            scope: {
	                menuname: "@"
	            },
	            templateUrl: 'public/mcctheme/js/app/directives/html/mccTheme/mccThemeMenu.html',
	            controller: function($scope, NavigationServiceResource, $window, $timeout) {
	                console.log($scope);
	                $scope.menudata = {};
	                var promise = {};
	                console.log($scope.menuname);
	                NavigationServiceResource.getTop({ menuname: $scope.menuname }, function(data) {
	                    var promise = data.$promise;
	                    delete data.$promise;
	                    delete data.$resolved;

	                    // 

	                    $scope.menudata = data;
	                    console.log($scope.menudata);

	                });

	                console.log("mcc theme menu", promise);

	                $scope.openMenu = function($mdOpenMenu, ev) {
	                    originatorEv = ev;
	                    $mdOpenMenu(ev);
	                };

	                $scope.$watch(function() {
	                    return $window.innerWidth;
	                }, function(value) {
	                    if (value < 600) {
	                        $scope.size = 'xs';
	                    } else {
	                        $scope.size = 'gt-xs';

	                    }
	                    console.log(value);
	                });



	                $scope.homeFilter = function(element) {
	                    // console.log('filter element', element);
	                    return element.name !== "Home";
	                }
	            }
	        }
	    })
