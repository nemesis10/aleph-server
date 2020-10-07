const achievement = require('../../../../models/profile/achievement');
const Achievement = require('../../../../models/profile/achievement');
const Profile = require('../../../../models/profile/profile');
// const { link } = require('../../../schema/sendOtpSchema');

module.exports = async function(obj, { userInput }, context, info){

    let achievements = [];
    let achieves = [];
    var i;

    for(i=0;i<userInput.length;i++){
        let achievement = new Achievement({
            userId: userInput[i].userId,
            icon: userInput[i].icon,
            year: userInput[i].year,
            description: userInput[i].description,
            link: userInput[i].link
        });
        achievements.push(achievement);
        let achieve =  await achievement.save();
        let ac = {
            userId: achieve.userId,
            _id: achieve._id,
            icon: achieve.icon,
            creationName: achieve.creationName,
            year: achieve.year,
            description: achieve.description
        };
        achieves.push(ac);
    }

    var query = {userId: userInput[0].userId};
    options = {};
    callback = function (err,result) {
        // console.log(result)
    };
    Profile.updateOne(query,{$push: {achievements: {$each: achievements}}},options,callback);
    // return {...cbucket._doc, _id: cbucket._id.toString() };
    return achieves;
}