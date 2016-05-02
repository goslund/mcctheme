angular.module('mccTheme').controller('BlogViewController', function($scope, BlogServiceResource, $sce) {
    console.log("BlogViewController", BlogServiceResource.get());
    $scope.articles = [];
    $scope.media = [];

    $scope.refreshMedia = function() {
        angular.forEach($scope.articles, function(article, key) {
            console.log(article);
        })
    }

    $scope.getArticles = function() {
        var promise = BlogServiceResource.get();
        promise.$promise.then(function(blogData) {
            console.log("blogData", blogData);
            angular.forEach(blogData.data, function(article, key) {
            	article.article_layout = $sce.trustAsHtml(article.article_layout);
            })
            $scope.articles = blogData.data;
            $scope.refreshMedia();
        }, function(err) {
            console.log(err);
        })
    }

    $scope.getArticles();
});
