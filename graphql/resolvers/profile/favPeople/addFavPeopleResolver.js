const Profile = require('../../../../models/profile/profile');

module.exports = async function(obj, { userInput }, context, info){

    let favPeoples = [];
    var i;

    for(i=0;i<userInput.length;i++){
        let favPeople = {
            name: userInput[i].name,
            alephLink: userInput[i].alephLink,
        };
        favPeoples.push(favPeople);
    }

    var query = {userId: userInput[0].userId};
    options = { upsert: true, new: true };
    callback = function (err,result) {
        // console.log(result);
    };
    await Profile.updateOne(query,{$push: {favPeople: {$each: favPeoples}}},options);
    // return {...cbucket._doc, _id: cbucket._id.toString() };
    let prof = Profile.findOne({userId: userInput[0].userId});
    let docs_prof = await prof;
    console.log("FavPeople length: ",docs_prof.favPeople.length);
    return docs_prof.favPeople;
}