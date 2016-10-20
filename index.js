var express = require('express');

var app = express();

var srv = app.listen(process.env.PORT);

app.use('/peerjs', require('peer').ExpressPeerServer(srv, {
    debug: true
}));