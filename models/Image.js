let mongoose = require('mongoose');

let imageSchema = new mongoose.Schema({
    img: {data: Buffer, encodedType: String},
    name: {type: String},
    type: {type: String}

});

let Image = mongoose.model('Image', imageSchema);
module.exports = Image;