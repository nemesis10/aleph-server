const Profile = require('../../../../models/profile/profile');

module.exports = async function(obj, { userInput }, context, info){

    let goodAts = [];
    var i;
    // console.log(userInput);
    console.log(userInput.length);
    for(i=0;i<userInput.length;i++){
        // console.log(userInput[i].qoute);
        let goodAt = {
            activity: userInput[i].activity,
            category: userInput[i].category
        };
        goodAts.push(goodAt);
    }
    console.log(goodAts);
    var query = {userId: userInput[0].userId};
    options = { upsert: true, new: true };
    // callback = function (err,result) {
    //     // console.log(result);
    // };
    await Profile.updateOne(query,{$push: {goodAt: {$each: goodAts}}},options);
    // return {...cbucket._doc, _id: cbucket._id.toString() };
    let prof = await Profile.findOne({userId: userInput[0].userId});
    let docs_prof = await prof;
    console.log("goodAt length: ",docs_prof.goodAt.length);
    return docs_prof.goodAt;
}