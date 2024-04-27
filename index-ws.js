const express = require( 'express' );
const { WebSocketServer } = require( 'ws' );
const server = require( 'http' ).createServer();

const app = express();

app.get( '/', ( req, res ) => {
    res.sendFile( 'index.html', { root: __dirname } );
} );

server.on( 'request', app );
server.listen( 3000, () => {
    console.log( 'Server started on http://localhost:3000' );
} );

/**
 * Begin Web Socket
 */

const WebSocket = require( 'ws' ).server;

const wss = new WebSocketServer( { server: server } );

wss.broadcast = function broadcast ( data ) {
    wss.clients.forEach( function each ( client ) {
            client.send( data );
    } );
};

wss.on( 'connection', function connection ( ws ) {
    const numClients = wss.clients.size;
    console.log( `Client connected. Total clients: ${ numClients }` );

    wss.broadcast( `Current Visitors: ${ numClients }` );

    if ( ws.readyState === ws.OPEN ) {
        ws.send( 'Welcome to my server!' );
    }

    ws.on( 'close', function close () { 
        wss.broadcast( `Current Visitors: ${ wss.clients.size }` );
        console.log( `Client Disconnected, Current Visitors: ${ wss.clients.size }` );
        
    });


} );