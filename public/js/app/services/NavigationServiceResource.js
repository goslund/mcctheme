angular.module('mccTheme').service('NavigationServiceResource', function($resource) {
    var baseurl = "/api/content/navigation"
    return $resource(baseurl, {}, {
    	getTop: {
    		url: baseurl + "?name=:menuname"
    	}
    })
});
