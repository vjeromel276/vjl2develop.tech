const http = require( 'http' );
const PORT = 3000;

http.createServer( function ( req, res ) {
	res.writeHead( 200, { 'Content-Type': 'text/html' } );
	//write imported file to page
	req.url === '/about' ? res.write("<h1>My name is Vincent</h1>") : 
	res.write( "<h1>On our way to being a full stack engineer</h1>" );
	res.end();
} ).listen( PORT );

console.log( `~~ server is running on ${ PORT } ~~` );
