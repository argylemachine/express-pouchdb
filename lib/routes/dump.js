"use strict";

var utils = require('../utils');

module.exports = function (app) {
	utils.requires(app, 'routes/db');

	app.get('/:db/_design/:id/_dump/:view', function( req, res ){

		var dumpHeader = function( viewResults ){
			
		};

		var dumpFooter = function( viewResults ){
			
		};

		var query = req.params.id + '/' + req.params.view;
		var opts = utils.makeOpts( req, req.query );
		req.db.query( query, opts, function( err, viewResult ){
			if( err ){
				// Call utils.sendCallback with res and err
				console.log( "I have err of " );
				console.log( err );
				return;
			}

			// Header
			res.write( JSON.stringify( dumpHeader(viewResult) ) + "\n" );

			// Fetch the documents based on ids being in viewResult
			
			// Footer
			res.end( JSON.stringify( dumpFooter(viewResult) ) );
		} );
	} );
};
