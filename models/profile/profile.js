const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    userId: String,
    bio: String,
    personality:[String],
    favPeople:[{
        name: String,
        alephLink: String
    }],
    creationBucket: [
        {
            type: Schema.Types.ObjectId,
            ref: 'CreationBucket'
        }
    ],
    achievements: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Achievement'
        }
    ],
    favQuotes:[{
        quote: String,
        quoteAuthor: String
    }],
    goodAt:[{
        activity: String,
        category: String
    }]
});

module.exports = mongoose.model('Profile',profileSchema);