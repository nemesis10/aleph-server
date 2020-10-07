const CreationBucket = require('../../../../models/profile/creationBucket');
const Profile = require('../../../../models/profile/profile');

module.exports = async function(obj, { userInput }, context, info){

    let creationBuckets = [];
    let cbuckets = [];
    var i;

    for(i=0;i<userInput.length;i++){
        let creationBucket = new CreationBucket({
            userId: userInput[i].userId,
            creationName: userInput[i].creationName,
            type: userInput[i].type,
            linkToPdfPhoto: userInput[i].linkToPdfPhoto,
            description: userInput[i].description
        });
        creationBuckets.push(creationBucket);
        let cbucket =  await creationBucket.save();
        let cb = {
            userId: cbucket.userId,
            creationName: cbucket.creationName,
            type: cbucket.type,
            linkToPdfPhoto: cbucket.linkToPdfPhoto,
            description: cbucket.description
        };
        cbuckets.push(cb);
    }
    // let profile = Profile.findOne({username: userInput.username});
    // let prof = await profile;
    // console.log(prof.username);
    // profile.creationBucket.push(creationBucket);
    // prof = await profile;
    // console.log(prof.creationBucket);
    // profile.save();

    var query = {userId: userInput[0].userId};
    options = { upsert: true, new: true };
    // callback = function (err,result) {
    //     console.log(result)
    // };
    await Profile.updateOne(query,{$push: {creationBucket: {$each: creationBuckets}}},options);
    // return {...cbucket._doc, _id: cbucket._id.toString() };
    return cbuckets;
}