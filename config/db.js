'use strict';

let mongoose = require('mongoose');

module.exports = function () {
    let link = 'mongodb://sofiasuser:sofia@ds145380.mlab.com:45380/sofiasdatabas';
    let db =mongoose.connect(link);

    db.connection.on('Connected', function () {
        console.log('Successfully connected to db');
    });

    db.connection.on('error', function () {
        console.log('We got a connection error');
    });

    db.connection.on('disconnected', function () {
        console.log('Mongoose connection disconnected');
    });

    process.on('SIGNT', function () {
        db.connection.close(function () {
            console.log('Mongoose connection disconnected through app termination');
            process.exit(0);
        });
    });

    return db;
};