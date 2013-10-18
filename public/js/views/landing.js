define([
	'jquery',
	'underscore',
	'backbone',
	'core/spineView'
	],
	function($, _, Backbone, SpineView){
		
		'use strict';

		var View = SpineView.extend({
		
			el: '#landing',

			events: {
				'click .del': 'deleteItem',
				'submit #addNew': 'addNew',
			},

			deleteItem: function(event) {
				var thisForm = $(event.target).parents('form')[0];

				this.doAction(thisForm.action, $(thisForm), event)
			},

			addNew: function(event) {

				if($('#newItemName').val() !== '') {
					this.doAction(event.target.action, $(event.target), event, function() {
						$('#newItemName').val('');
						$('#newItemName').focus();
					});
				}
			},
			
			doAction: function(action, $form, event, callback) {
				var that = this;

				$('body').addClass('loading');

				$.post(action, $form.serialize(), function(json){
					that.renderTemplate(json);
					$('body').removeClass('loading');

					if(callback) {
						callback();
					}
				});
				
				event.preventDefault();
			}
		});
		
		return View;
	}
);
