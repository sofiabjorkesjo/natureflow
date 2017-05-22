'use strict';

let mongoose = require('mongoose');

let imageSchema = new mongoose.Schema({
    path: {type: String},
    owner: {type: String},
    date: {type: Date, default: Date.now},
    imageId: {type: String},
    hashtags: {type: String},
    ownerId: {type: String}
});

let Image = mongoose.model('Image', imageSchema);
module.exports = Image;
