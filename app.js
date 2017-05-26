'use strict';
//ett ramverk som hjälper en att utveckla applikationer
let express = require('express');
//gör så att man kan bygga layoutmallar
let exphbs = require('express-handlebars');
//kan spara ner data
let session = require('express-session');
let mongoose = require('./config/db');
let bodyParser = require('body-parser');
//kan använda sökvägar
let path = require('path');
let fileUpload = require('express-fileupload');
let http = require('http');


let app = express();
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let port = process.env.PORT || 3000;

//connectar till mongoose
mongoose();

//sätter strukturen på sidorna som renderas ut & talar om vilken templaemotor som jag vill använda
app.engine('.hbs', exphbs({
    defaultLayout: 'default',
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.use(session({
    name:   "theserversession",
    secret: "K7smsx9MsEasad89wEzVp5EeCep5s",
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    next();
});

//flash meddelanden.
//får man en request där session är satt så sätter man responsen till det.
app.use(function (req, res, next) {
    res.locals.flash = req.session.flash;
    delete req.session.flash;
    next();
});


//startar
let server = http.createServer(app).listen(port, function () {
    console.log('Express started on http://localhost' + port);
});
let io = require('socket.io')(server);
app.use('/', require('./routes/home'));
app.use('/', require('./routes/socketRoutes')(io));

//public mappen
app.use(express.static(path.join(__dirname, 'public')));


//404 error handeling
app.use(function (req, res, next) {
    res.status(404);
    res.render('error/404');

});

//500 error handeling
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).render('error/500');

});

//ansluter och avslutar anslutningen till sockets.

io.on('connection', function (socket) {
    socket.emit('message', 'You are connected to sockets');
    socket.on('disconnected', function () {
        console.log('disconnected socket');
    });
});