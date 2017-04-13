'use strict';

let mongoose = require('mongoose');

let imageSchema = new mongoose.Schema({
    path: {type: String},
    owner: {type: String}
});

let Image = mongoose.model('Image', imageSchema);
module.exports = Image;