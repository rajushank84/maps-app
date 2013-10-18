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
			          zoom: 12,
			          //center: new google.maps.LatLng(-34.397, 150.644),
			          mapTypeId: google.maps.MapTypeId.ROADMAP
			        },
			        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions),
			        ads,
			        infoBox = [],
			        i,
			        that = this;

			    ads = [
					{
						pos: {lb: 37.355285, mb: -121.906013},
						content: "Honda Civic wheels for sale"
					},
					{
						pos: {lb: 37.344641,
						mb: -121.932821},
						content: "Homemade cookies"	
					},
					{
						pos: {lb: 37.396823,
						mb: -121.958728},
						content: "Moving sale - everything must go. Furniture, household items"
					},
					{
						pos: {lb: 37.427911,
						mb: -121.880107},
						content: "Baby stroller suitable for 1 to 3 year-olds"
					},
					{
						pos: {lb: 37.379024,
						mb: -121.981544},
						content: "Want to buy - used vacuum cleaner less than $75"
					}
				];

			    // Try HTML5 geolocation
			    if (navigator.geolocation) {
			        navigator.geolocation.getCurrentPosition(function (position) {
			            var pos = new google.maps.LatLng(position.coords.latitude,
			                position.coords.longitude);

			            map.setCenter(pos);
						for(i=0; i<ads.length; i++) {
							that.createBox(ads[i].pos.lb, ads[i].pos.mb, ads[i].content);

				         }

			            map.setCenter(pos);
			        }, function () {
			            handleNoGeolocation();
			        });
			    } else {
			        handleNoGeolocation();
			    }
			    
			    this.map = map;
			},

			createBox: function(lat, lon, html) {
			    var map = this.map,
			    	newBox = new InfoBox({
				        position: new google.maps.LatLng(lat, lon),
				        map: map,
			            content: html
			        });

    			newBox.open(map);
			},

			handleNoGeolocation: function() {
			    alert("Geolocation failed.");
			}			
		});
		
		return View;
	}
);
