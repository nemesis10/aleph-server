const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creationBucketSchema = new Schema({
    userId: String,
    creationName: String,
    type: String,
    linkToPdfPhoto: String,
    description: String
});

module.exports = mongoose.model('CreationBucket',creationBucketSchema);