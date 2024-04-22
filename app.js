const http = require( 'http' );
const PORT = 3000;

const html = "./home.html"

http.createServer( function ( req, res ) {
	res.writeHead( 200, { 'Content-Type': 'text/html' } );
	req.url === '/about' ? res.write( html ) :
	res.write( "<h1>On our way to being a full stack engineer</h1>" );
	res.end();
} ).listen( PORT );

console.log( `~~ server is running on ${ PORT } ~~` );
