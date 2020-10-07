const Profile = require('../../../models/profile/profile');
const CreationBucket = require('../../../models/profile/creationBucket');
const Achievement = require('../../../models/profile/achievement');
// const user = require('../../../models/User/user');
// const user = require('../../../models/User/user');

module.exports = async function(obj, { userInput }, context, info){

    // 5f796c64c5ed446d60fa8147

    if(userInput.type === "achievement"){
        var i;

        console.log("objectId's: ",userInput.objectId);
        for(i=0;i<userInput.objectId.length;i++){
            Achievement.findByIdAndDelete(userInput.objectId[i],function(err,docs){
                if(err){
                    console.log(error)
                }
                else{
                    console.log("Deleted : ",docs);
                }
            });
        }
        var query = {userId: userInput.userId};
        options = {};
        callback = function (err,result) {
            // console.log(result)
        };
        Profile.updateOne(query,{$pull: {achievements: {$in: userInput.objectId}}},options,callback);
    }
    else if(userInput.type === "creationBucket"){
        
        var i;
        for(i=0;i<userInput.objectId.length;i++){
            CreationBucket.findByIdAndDelete(userInput.objectId,function(err,docs){
                if(err){
                    console.log(error)
                }
                else{
                    console.log("Deleted : ",docs);
                }
            });
        }
        CreationBucket.findByIdAndDelete(userInput.objectId,function(err,docs){
            if(err){
                console.log(error)
            }
            else{
                console.log("Deleted : ",docs);
            }
        });
        var query = {userId: userInput.userId};
        options = {};
        callback = function (err,result) {
            // console.log(result)
        };
        Profile.updateOne(query,{$pull: {creationBucket: {$in: userInput.objectId}}},options,callback);
    }
    else if(userInput.type === "favPeople"){
        var i;

        console.log("objectId's: ",userInput.objectId);
        var query = {userId: userInput.userId};
        options = {};
        callback = function (err,result) {
            // console.log(result)
        };
        Profile.updateOne(query,{$pull: {favPeople: {_id: userInput.objectId}}},options,callback);
    }
    else if(userInput.type === "favQuotes"){
        var i;

        console.log("objectId's: ",userInput.objectId);
        var query = {userId: userInput.userId};
        options = {};
        callback = function (err,result) {
            // console.log(result)
        };
        Profile.updateOne(query,{$pull: {favQuotes: {_id: userInput.objectId}}},options,callback);
    }
    else if(userInput.type === "goodAt"){
        console.log("objectId's: ",userInput.objectId);
        var query = {userId: userInput.userId};
        options = {};
        callback = function (err,result) {
            // console.log(result)
        };
        Profile.updateOne(query,{$pull: {goodAt: {_id: userInput.objectId}}},options,callback);
    }

    
    let prof = Profile.findOne({userId: userInput.userId}).populate('CreationBucket').exec();
        const docs_prof = await prof;

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
        let cBucket = CreationBucket.findById(docs_prof.creationBucket[i]);
        let docs_cbucket = await cBucket;
        prof1.creationBucket.push(docs_cbucket);
    }
    let achievements = Achievement.find({userId: userInput.userId});
    let docs_achivements = await achievements;
    prof1.achievements = docs_achivements;

    console.log(prof1);
    return prof1;

}