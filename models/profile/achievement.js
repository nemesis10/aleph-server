const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const achievementSchema = new Schema({
    userId: String,
    icon: String,
    description: String,
    year: String,
    link: String
});

module.exports = mongoose.model('Achievement',achievementSchema);