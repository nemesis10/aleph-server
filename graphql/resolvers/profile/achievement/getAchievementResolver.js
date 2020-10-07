const Achievement = require('../../../../models/profile/achievement');


module.exports = async function(obj, { userInput }, context, info){

    let achievement = await Achievement.findById(userInput.objectId);
    // let cb = creationBucket.findOne({username: userInput.username});
    let docs_achieve = await achievement;
    console.log(docs_achieve);
    return achievement;
}