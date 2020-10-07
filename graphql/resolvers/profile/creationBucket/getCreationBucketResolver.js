const creationBucket = require('../../../../models/profile/creationBucket');


module.exports = async function(obj, { userInput }, context, info){

    let cbucket = await creationBucket.findById(userInput.objectId);
    // let cb = creationBucket.findOne({username: userInput.username});
    let cb = await cbucket;
    console.log(cb);
    return cbucket;
}