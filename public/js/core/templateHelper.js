define(function () {

	'use strict';

	function renderTemplate(templateName, json, callback) {

	    var out;

		if(typeof dust!=='undefined') {
			dust.render('public/templates/' + json.viewName + '.dust', json, function(err, output) {
          		out = output;
        	});      
	    }
	    else if(typeof EJS!=='undefined') {
	        out = new EJS({url: 'templates/' + templateName + '.ejs'}).render(json);
	    }

        if(callback) {
            callback(out);
        }
	}

	return {
		renderTemplate: renderTemplate
	};

});
