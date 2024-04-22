const http = require( 'http' );
const fs = require( 'fs' );
const PORT = 3000;

http.createServer( function ( req, res ) {
	res.writeHead( 200, { 'Content-Type': 'text/html' } );
	res.write( "<h1>On our way to being a full stack engineer with cron</h1>" );
	res.end();
} ).listen( PORT );

console.log( `~~ server is running on ${ PORT } ~~` );
