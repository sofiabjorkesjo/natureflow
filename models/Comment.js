'use strict';

let mongoose = require('mongoose');

let commentSchema = new mongoose.Schema({
    text: {type: String},
    owner: {type: String},
    date: {type: Date, default: Date.now},
    id: {type: String}
});

let Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;