const Profile = require('../../../models/profile/profile');
const CreationBucket = require('../../../models/profile/creationBucket');
const Achievement = require('../../../models/profile/achievement');
// const user = require('../../../models/User/user');
// const user = require('../../../models/User/user');

module.exports = async function(obj, { userInput }, context, info){

    // 5f796c64c5ed446d60fa8147

    let profile = new Profile({
        userId: userInput.userId,
        bio: userInput.bio,
        personality: userInput.personality,
        favPeople: userInput.favPeople,
        favQuotes: userInput.favQuotes,
        goodAt: userInput.goodAt
    });
    
    let creationBucket = new CreationBucket({
        userId: userInput.userId,
        creationName: userInput.creationName,
        type: userInput.creationType,
        linkToPdfPhoto: userInput.creationLink,
        description: userInput.creationDescription
    });
    profile.creationBucket.push(creationBucket);
    creationBucket.save();
    
    var i;
    for(i=0;i<userInput.achievements.length;i++){
        let achievement = new Achievement({
            userId: userInput.userId,
            icon: userInput.achievements[i].icon,
            description: userInput.achievements[i].description,
            year: userInput.achievements[i].year,
            link: userInput.achievements[i].link
        });
        profile.achievements.push(achievement);
        achievement.save();
    }

    let prof =  await profile.save();
    return prof;
}