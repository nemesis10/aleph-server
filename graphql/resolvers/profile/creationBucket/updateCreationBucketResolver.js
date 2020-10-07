const creationBucket = require('../../../../models/profile/creationBucket');


module.exports = async function(obj, { userInput }, context, info){

    let updateParams = JSON.parse(JSON.stringify(userInput));
    // console.log('updateParams : ',userInput.objectId);
    delete updateParams.objectId;
    console.log('updateParams : ',updateParams);

    let cbucket = await creationBucket.findByIdAndUpdate(userInput.objectId,updateParams);
    // let cb = creationBucket.findOne({username: userInput.username});
    let cb = await cbucket;
    console.log('returned object : ',cb);
    return cbucket;
}