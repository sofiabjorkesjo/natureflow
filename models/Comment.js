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
}, 'The comment must be max 30 characters and minumum 1 charachters');

commentSchema.path('text').validate(function (text) {
    return text.length >= 1;
}, 'The comment must be max 30 characters and minumum 1 charachters');

let Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;