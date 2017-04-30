'use strict';

let mongoose = require('mongoose');

let commentSchema = new mongoose.Schema({
    text: {type: String},
    owner: {type: String},
    date: {type: Date, default: Date.now},
    imageId: {type: String}
});

commentSchema.path('text').validate(function (text) {
    return text.length <= 30;
}, 'Max 30 characters');

let Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;