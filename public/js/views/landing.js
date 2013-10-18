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

			map: null,

			events: {
				'click .del': 'deleteItem',
				'submit #addNew': 'addNew',
			},

			afterRender: function() {
				this.initializeMap();
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
			},

			initializeMap: function() {
			    var mapOptions = {
			          zoom: 14,
			          //center: new google.maps.LatLng(-34.397, 150.644),
			          mapTypeId: google.maps.MapTypeId.ROADMAP
			        },
			        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

			    // Try HTML5 geolocation
			    if (navigator.geolocation) {
			        navigator.geolocation.getCurrentPosition(function (position) {
			            var pos = new google.maps.LatLng(position.coords.latitude,
			                position.coords.longitude);



			            var infoBox = new InfoBox({
			                position: pos,
			                map: map,
			                content: "<div class='infoBox'>You are here</div>"
			            });

			            infoBox.open(map);

			            map.setCenter(pos);

			        }, function () {
			            handleNoGeolocation();
			        });
			    } else {
			        handleNoGeolocation();
			    }

			    this.map = map;
			},

			handleNoGeolocation: function() {
			    alert("Geolocation failed.");
			}			
		});
		
		return View;
	}
);
