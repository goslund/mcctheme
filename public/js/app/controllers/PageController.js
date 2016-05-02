angular.module('mccTheme').controller('PageController', function($element, $compile, $http, $scope, $state, $stateParams, $sce, PageServiceResource) {
    console.log("page controller");
    console.log($stateParams);

    $scope.pageData = {};
    $scope.compiledTemplate;


    $scope.updatePage = function() {
        var servicepromise = PageServiceResource.getBySlug({
            pageSlug: $stateParams.pageSlug
        });

        console.log(servicepromise);

        servicepromise.$promise.then(function(data) {
        	console.log(data);
        	if (data.count != 1) {
        		servicepromise.reject("expecting 1 page record")
        	}

        	$scope.pageData = data.data[0];

        	$scope.compiledTemplate = $compile(data.data[0].page_layout)($scope);
        	console.log("compiled", $scope.compiledTemplate);
        	$element.find('div').append($scope.compiledTemplate);
        	// $scope.pageData.page_layout = $sce.trustAsHtml($scope.compiledTemplate);

        })


    }

    $scope.updatePage();
});
