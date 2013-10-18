define([
        'jquery',
        'underscore',
        'backbone',
        'core/templateHelper'
], function ($, _, Backbone, TemplateHelper) {

    'use strict';

    var SpineView = Backbone.View.extend({

        renderTemplate: function (json, callback) {
            var that = this;

            TemplateHelper.renderTemplate(json.viewName, json, function(out) {
                if(that.el) {
                    $(that.el).html(out);
                }
            });

            if(callback) {
                callback();
            }

            if (this.afterRender) {
                this.afterRender();
            }
        },

        showTemplate: function() {
            $(this.el).show();
        },

        hideTemplate: function() {
            $(this.el).hide();
        }


    });

    return SpineView;
});