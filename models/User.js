'use strict';

let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');

/**
 * Schema för användare
 */

let userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
});

//användarnamnet måste vara minst 4 tecken & lösenordet minst 6 tecken

userSchema.path('username').validate(function (username) {
    return username.length >= 4;
}, 'The username must be of minimum length 4 characters');

userSchema.path('password').validate(function (password) {
    return password.length >= 6;
}, 'The password must be of minimum length 6 characters');

//hashar och saltar llösenordet

userSchema.pre('save', function (next) {
    let user = this;
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

let User = mongoose.model('User', userSchema);
module.exports = User;