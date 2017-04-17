'use strict';

let mongoose = require('mongoose');

let imageSchema = new mongoose.Schema({
    path: {type: String},
    owner: {type: String},
    date: {type: Date, default: Date.now}
});

let Image = mongoose.model('Image', imageSchema);
module.exports = Image;