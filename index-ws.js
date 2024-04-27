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

const wss = new WebSocketServer( { server: server } );

process.on( 'SIGINT', ( e ) => {
    console.log( e );
    wss.clients.forEach( function each ( client ) {
        client.close();
    } );
    console.log( 'Shutting down server...' );
    server.close( () => {
        shutDownDB();
    } );
} );

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

    db.run( `
        INSERT INTO visitors (count, time) 
        VALUES ( ${ numClients }, datetime('now'))
    ` );

    ws.on( 'close', function close () {
        wss.broadcast( `Current Visitors: ${ wss.clients.size }` );
        console.log( `Client Disconnected, Current Visitors: ${ wss.clients.size }` );

    } );
} );

/**
 * End Web Socket
 * Begin Database
 */
const sqlite = require( 'sqlite3' );
const db = new sqlite.Database( ':memory:' );

db.serialize( () => {
    db.run( `
        CREATE TABLE visitors (
            count INTEGER,
            time TEXT
        )
    `);
} );

function getCount () {
    db.each( 'SELECT * FROM visitors', ( err, row ) => {
        err ? console.error( err ) : console.log( row );
    } );
}

function shutDownDB () {
    getCount();
    console.log( 'Shutting down db...' );
    db.close( () => {
        console.log( 'Database closed.' );
    } );
}