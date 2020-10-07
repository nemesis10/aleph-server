const profile = require('../../../models/profile/profile');
const creationBucket = require('../../../models/profile/creationBucket');
const Achievement = require('../../../models/profile/achievement');

module.exports = async function(obj, { userInput }, context, info){

    let prof = profile.findOne({userId: userInput.userId}).populate('CreationBucket').exec();
    const docs_prof = await prof;

    // let cb = creationBucket.findOne({username: userInput.username});
    let cBucket = creationBucket.findById(docs_prof.creationBucket[0]);
    // let docs_cbucket = await cBucket;
    // 5f7964d4176dde7034c4d75b

    let prof1 = {
        _id: docs_prof._id,
        userId: docs_prof.userId,
        bio: docs_prof.bio,
        creationBucket: [],
        achievements: [],
        personality: docs_prof.personality,
        favPeople: docs_prof.favPeople,
        favQuotes: docs_prof.favQuotes,
        goodAt: docs_prof.goodAt
    }

    var i;
    for(i=0;i<docs_prof.creationBucket.length;i++){
        let cBucket = creationBucket.findById(docs_prof.creationBucket[i]);
        let docs_cbucket = await cBucket;
        prof1.creationBucket.push(docs_cbucket);
    }
    let achievements = Achievement.find({userId: userInput.userId});
    let docs_achivements = await achievements;
    prof1.achievements = docs_achivements;

    console.log(prof1);
    return prof1;
}