'use strict';

let express = require('express');
let exphbs = require('express-handlebars');
let session = require('express-session');
let mongoose = require('./config/db');
let bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let port = process.env.PORT || 3000;

mongoose();

app.engine('.hbs', exphbs({
    defaultLayout: 'default',
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.use('/', require('./routes/home'));

app.listen(port, function () {
    console.log('Express started on http://localhost' + port);
});