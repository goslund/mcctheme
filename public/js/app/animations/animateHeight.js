angular.module('goopAnimations').animation('.goop-height', function() {
    return {
    	event: function(element, done) {
    		console.log("event!!!!");
    		done();
    	},
        enter: function(element, done) {
            console.log("Goop Height Animation", element);
            done();
        },
        addClass: function(element, className, done) {
            console.log('element');
            done();
        },
        leave: function(element, done) {
            done();
        }
    }
})
