const express = require( 'express' );
const server = require( 'http' ).createServer();

const app = express();

app.get( '/', ( req, res ) => {
    res.sendFile( 'index.html', { root: __dirname } );
} );

server.on( 'request', app );
server.listen( 3000, () => {
    console.log( 'Server started on http://localhost:3000' );
} );