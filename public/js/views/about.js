define([
	'jquery',
	'underscore',
	'backbone',
	'core/spineView'
	],
	function($, _, Backbone, SpineView){
		
		'use strict';

		var View = SpineView.extend({
		
			el: '#about'

		});
		
		return View;
	
	}
);
