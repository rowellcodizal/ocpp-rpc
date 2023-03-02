const RPCClient = require('./lib/client');
const RPCServer = require('./lib/server');
const errors = require('./lib/errors');
const symbols = require('./lib/symbols');
const { createRPCError } = require('./lib/util');
const { createValidator } = require('./lib/validator');

module.exports = {
    RPCServer,
    RPCClient,
    createRPCError,
    createValidator,
    ...errors,
    ...symbols,
};

//const {RPCServer, RPCClient} = require('ocpp-rpc');
const express = require('express');

const app = express();
const httpServer = app.listen(3000, 'localhost');

const rpcServer = new RPCServer();
httpServer.on('upgrade', rpcServer.handleUpgrade);


app.get('/Ocpp/CentralSystemService/', (req,res) => {
    res.send('okay')
});

rpcServer.on('client', client => {
    // RPC client connected
    client.call('Say', `Hello, ${client.identity}!`);
});

// create a simple client to connect to the server
const cli = new RPCClient({
    endpoint: 'ws://localhost:3000',
    identity: 'XYZ123'
});

cli.handle('Say', ({params}) => {
    console.log('Server said:', params);
});

cli.connect();