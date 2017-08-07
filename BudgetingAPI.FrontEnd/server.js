'use strict';
var host = '127.0.0.1',
    port = 4200;
var path = require('path');
var app = require('express')();
app.get('/bundle.js', (req, res) => res.sendFile(path.join(__dirname, 'public/bundle.js')));
app.get('/style.css', (req, res) => res.sendFile(path.join(__dirname, 'public/style.css')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.listen(port, () => console.log(`Listening on http://${host}:${port}/`));