'use strict';

let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');

//ett schema för en användare

let userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
});

userSchema.path('password').validate(function (password) {
    return password.length >= 4;
}, 'The password must be of minimum length 6 characters');

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