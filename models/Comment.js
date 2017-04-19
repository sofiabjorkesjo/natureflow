'use strict';

let mongoose = require('mongoose');

let commentSchema = new mongoose.Schema({
    text: {type: String},
    date: {type: Date, default: Date.now}
});

let Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;