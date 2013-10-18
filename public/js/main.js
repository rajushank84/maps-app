require.config({
	paths: {
		jquery: 'lib/jquery-min',
		underscore: 'lib/underscore-min',
		backbone: 'lib/backbone-optamd3-min'
	}
});

require(['views/app','backbone'], function(AppView, Backbone){
	'use strict';

	var appView =  new AppView();

	appView.render();

	var AppRouter = Backbone.Router.extend({
		routes: {
			'landing': 'landing',
			'about': 'about',
			'': 'landing'
		},

		about: function() {
			appView.getPage('/about');
		},

		landing: function() {
			appView.getPage('/landing');
		},

		default: function() {
			Backbone.history.navigate('#landing');
		}
	});

	var appRouter = new AppRouter();
	Backbone.history.start();
}); 

require([
        '../jsdust/landing',
        'views/landing',
        '../jsdust/about',
        'views/about',
        ], function(){
                // do nothing. Just prefetching.
        }
);
