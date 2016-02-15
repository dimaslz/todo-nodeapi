'use strict';

var path = require('path');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');

var express = require('express');
var mongoose = require('mongoose');

var config = require('config');
var router = require('api/router');

// mongoose.connect('mongodb://localhost:27017/todo');
mongoose.connect('mongodb://todoapp:c28d73b0d273c7f9f8bc26d74cef634a@dokku-mongo-todoapp:27017/todoapp');
var db = mongoose.connection;
 
db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected.');
});

var app = express();

app.use(express.static('./public'));
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

nunjucks.configure(app.get('views'), {
    autoescape: true,
    express: app,
    watch: config.env == 'development'
});

app.use('/api', router);


// do not cache API responses
app.use(function (req, res, next) {
    const endpoints = [
        '/api'
    ];

    if (endpoints.some((e) => req.url.startsWith(e))) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
    }

    next();
});


// redirect all outher routes to our single page application
// app.get('/*', function (req, res) {
//     res.render('index.html');
// });


// start server!
app.listen(config.port, (err) => {
    if (err) {
        console.error(err);
        mongoose.close();
    } else {
        console.info('✅  Server ready: http://localhost:%s', config.port);
    }
});
