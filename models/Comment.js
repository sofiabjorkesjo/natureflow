'use strict';

/**
 * Schema för kommentarerna
 */

let mongoose = require('mongoose');

let commentSchema = new mongoose.Schema({
    text: {type: String},
    owner: {type: String},
    date: {type: Date, default: Date.now},
    imageId: {type: String}
});

//kommentaren får vara max 30 tecken och minst 1 tecken

commentSchema.path('text').validate(function (text) {
    return text.length <= 30;
}, 'The comment must be max 30 characters and minumum 1 characters');

commentSchema.path('text').validate(function (text) {
    return text.length >= 1;
}, 'The comment must be max 30 characters and minumum 1 characters');

let Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;