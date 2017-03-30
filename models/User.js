let mongoose = require('mongoose');

//ett schema för en användare

let userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
});

let User = mongoose.model('User', userSchema);
module.exports = User;