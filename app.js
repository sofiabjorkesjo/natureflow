'use strict';
//ett ramverk som hjälper en att utveckla applikationer
let express = require('express');
//gör så att man kan bygga layoutmallar
let exphbs = require('express-handlebars');
//kan spara ner data
let session = require('express-session');
let mongoose = require('./config/db');
//req.body
let bodyParser = require('body-parser');
//kan använda sökvägar
let path = require('path');

let fileUpload = require('express-fileupload');


let app = express();
app.use(fileUpload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//app.use(bodyParser({uploadDir: './images'}));

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

app.use('/', require('./routes/home'));

//public mappen
app.use(express.static(path.join(__dirname, 'public')));

//startar
app.listen(port, function () {
    console.log('Express started on http://localhost' + port);
});