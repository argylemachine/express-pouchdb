var express	= require( 'express' );
var app		= express( );
var PouchDB	= require( 'pouchdb' );
var Promise	= require( 'lie' );
var port	= 3000;
var nano	= require( 'nano' )("http://localhost:" + port);
var db;

var random	= require( 'random-json' );

app.use( '/', require( '../')(PouchDB) );

var insertRandomDocs = function( cb ){
	
	var _promises = [ ];
	for( var round=1; round<5; round++ ){
		for( var z=0; z<100; z++ ){
			_promises.push( new Promise( function( resolve, reject ){
				random.obj( function( z ){

					// Shove round in so that we can use it in a view.
					z.round = round;
					
					// Lets post 
					db.insert( z, function( err, body ){
						if( err ){ return reject( err ); }
						return resolve( );
					} );
				}, 10 );
			} ) );
		}
	}

	Promise.all( _promises ).then( function( z ){
		return cb( null );
	} );
};

var defineView = function( cb ){
	
};

app.listen( port, function( ){

	console.log( "Check port " + port );

	// Lets set db so that insertRandomDocs and defineView can use it.
	nano.db.create( "db", function( ){

		db = nano.db.use( "db" );

		insertRandomDocs( function( ){
			console.log( "GOT HERE" );
		} );
	} );
} );
