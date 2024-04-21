const http = require( 'http' );
const PORT = 3000;

http.createServer( function ( req, res ) {
	res.write( "On our way to being a full stack engineer" );
	res.end();
} ).listen( PORT );

console.log( `~~ server is running on ${ PORT }` );
