'use strict';

let express = require('express');
let exphbs = require('express-handlebars');
let session = require('express-session');

let app = express();

let port = process.env.PORT || 3000;

app.engine('.hbs', exphbs({
    defaultLayout: 'default',
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.use('/', require('./routes/home'));

app.listen(port, function () {
    console.log('Express started on http://localhost' + port);
});