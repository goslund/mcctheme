angular.module('mccTheme').service('PageServiceResource', function($resource) {
    var baseurl = "/api/content/pages"
    return $resource(baseurl, {}, {
    	getBySlug: {
    		url:"/api/content/pages2?q=:pageSlug"
    	}
    })
});
