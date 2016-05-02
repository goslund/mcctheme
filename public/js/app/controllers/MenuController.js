angular.module('mccTheme').controller('MenuController', function($scope, $sce) {
	console.log("menuController");
    $scope.homeFilter = function(element) {
        console.log('filter element', element);
        return true;
    }
});
