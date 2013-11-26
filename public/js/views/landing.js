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

			pos: {},

			events: {
				'click .del': 'deleteItem',
				'submit #addNew': 'addNew',
			},

			afterRender: function() {
				this.initializeMap();
			},

			deleteItem: function(event) {
				var thisForm = $(event.target).parents('form')[0];

				this.doAction(thisForm.action, $(thisForm), event);
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
				var that = this,
					formData = $form.serializeArray();

				$('body').addClass('loading');

				formData.push({name: "lb", value: this.pos.lb});
				formData.push({name: "mb", value: this.pos.mb});

				$.post(action, formData, function(json){
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
			          mapTypeId: google.maps.MapTypeId.ROADMAP
			        },
			        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions),
			        ads,
			        infoBox = [],
			        i,
			        that = this;

				// dummy data for testing locally without a mongodb connection
				/*			    ads = [
				{
					"lb": "37.355285", "mb": "-121.906013",
					"content": "Honda Civic wheels for sale"
				},
				{
					"lb": "37.344641", "mb": "-121.932821",
					"content": "Homemade cookies"	
				},
				{
					"lb": "37.396823", "mb": "-121.958728",
					"content": "Moving sale - everything must go. Furniture, household items"
				},
				{
					"lb": "37.427911", "mb": "-121.880107",
					"content": "Baby stroller suitable for 1 to 3 year-olds"
				},
				{
					"lb": "37.379024", "mb": "-121.981544",
					"content": "Want to buy - used vacuum cleaner less than $75"
				}
								];
				*/

				ads = this.json.data.ads;

			    // Try HTML5 geolocation
			    if (navigator.geolocation) {
			        navigator.geolocation.getCurrentPosition(function (position) {
			            var pos = new google.maps.LatLng(position.coords.latitude,
			                position.coords.longitude);

			            map.setCenter(pos);
			            // for POSTS that happen from here
			            that.pos.lb = pos.ob;
			            that.pos.mb = pos.pb;

			            map.setCenter(pos);
			        }, function () {
			            handleNoGeolocation();
			        });
			    } else {
			        handleNoGeolocation();
			    }

			    this.map = map;

			    i=0;

			    function createInfoBox() {

			    	// yes these are actually strings with values of "undefined" - not sure where those values came from!
			    	if(ads[i].lb && ads[i].mb && ads[i].lb !== "undefined" && ads[i].mb !== "undefined") {
						that.createBox(ads[i].lb, ads[i].mb, ads[i].content);
					}

					i++;
					
					if(i<ads.length) {
						setTimeout(createInfoBox, 100);
					}
			    }

			    setTimeout(createInfoBox, 100);

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
