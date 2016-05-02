	angular.module('goopMenuElement', [])
	    .directive('goopMenu', function($sce) {
	        return {
	            restrict: 'AE',
	            templateUrl: '/js/angular/directives/html/GoopMenu.html',
	            scope: {
	                menuitems: "="
	            }
	        }
	    })
