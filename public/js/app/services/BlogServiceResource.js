angular.module('mccTheme').service('BlogServiceResource', function($resource) {
    var baseurl = "/api/content/articles"
    return $resource(baseurl, {}, {

    })
});
