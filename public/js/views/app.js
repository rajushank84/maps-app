define([
        'jquery',
        'underscore',
        'backbone',
        'core/spineView',
        'views/landing',
        'views/about'
], function ($, _, Backbone, SpineView, LandingView, AboutView) {

    'use strict';

    var AppView = SpineView.extend({

        el: 'body',

        childViews: {},

        events: {
            'submit form.proceed': 'proceedForm',
            'click input.submit': 'proceedForm',
            'click a.proceed': 'proceedLink',
        },

        initialize: function() {
            this.childViews = {
                'landing': new LandingView({parent: this}),
                'about': new AboutView({parent: this})
            };
        },

        proceedForm: function (e) {
            $.post(e.target.action, $(e.target).serialize(), function (json) {
                this.showPage(json);
            });

            e.preventDefault();
        },

        proceedLink: function (e) {
            this.getPage(e.target.href);
            e.preventDefault();
        },

        getPage: function (url) {
            var that = this;

            that.childViews.landing.hideTemplate();
            that.childViews.about.hideTemplate();

            $('body').addClass('loading');
            $.get(url, function (json) {
                that.childViews[json.viewName].renderTemplate(json, function() {
                    that.childViews[json.viewName].showTemplate();
                    $('body').removeClass('loading');
                });
            });
        }
    });

    return AppView;
});