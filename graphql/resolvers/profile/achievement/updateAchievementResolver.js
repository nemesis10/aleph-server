const Achievement = require('../../../../models/profile/achievement');


module.exports = async function(obj, { userInput }, context, info){

    let updateParams = JSON.parse(JSON.stringify(userInput));
    // console.log('updateParams : ',userInput.objectId);
    delete updateParams.objectId;
    console.log('updateParams : ',updateParams);

    let achievement = await Achievement.findByIdAndUpdate(userInput.objectId,updateParams);
    // let cb = creationBucket.findOne({username: userInput.username});
    let docs_achieve = await achievement;
    console.log('returned object : ',docs_achieve);
    return achievement;
}