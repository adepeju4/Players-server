const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const playerSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    position: {
        type: Number
    },
    clubName: {
        type: String
    },
    avatar: {
        type: String
    }
});

module.exports = mongoose.model('Player', playerSchema)