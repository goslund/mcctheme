angular.module('goopUi', ['goopAnimations'])
    .directive('goopUiRoot', function($rootScope, $sce, $timeout) {
        console.log($rootScope.appConfig);
        return {
            restrict: 'AE',
            templateUrl: 'public/' + $rootScope.appConfig.templateName + '/js/app/directives/html/goopUiRoot.html',
            scope: {
                menuitems: "=",
                state: "=",
                faded: "="
            },
            replace: true,
            controller: function($rootScope, $scope, $element, $timeout, $q, $state) {

                // $state.go("main.home");
                

                // $timeout(function() {
                //     $scope.faded = true;
                //     $rootScope.$apply();
                // }, 2000, false)

                // $timeout(function() {
                //     $rootScope.uiState = "open";
                //     $rootScope.$apply();
                // }, 2200, false)

                // $timeout(function() {
                // 	var promise = $state.go("main.blog");

                // 	promise.then(function(success) {
                // 		$scope.faded = false;
                // 	})
                // }, 3000, false)
            }
        }
    })
