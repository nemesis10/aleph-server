const Profile = require('../../../../models/profile/profile');

module.exports = async function(obj, { userInput }, context, info){

    let favQuotes = [];
    var i;
    // console.log(userInput);
    for(i=0;i<userInput.length;i++){
        // console.log(userInput[i].qoute);
        let favQuote = {
            quote: userInput[i].quote,
            quoteAuthor: userInput[i].quoteAuthor
        };
        favQuotes.push(favQuote);
    }

    var query = {userId: userInput[0].userId};
    options = { upsert: true, new: true };
    // callback = function (err,result) {
    //     // console.log(result);
    // };
    await Profile.updateOne(query,{$push: {favQuotes: {$each: favQuotes}}},options);
    // return {...cbucket._doc, _id: cbucket._id.toString() };
    let prof = await Profile.findOne({userId: userInput[0].userId});
    let docs_prof = await prof;
    console.log("FavQuotes length: ",docs_prof.favQuotes.length);
    return docs_prof.favQuotes;
}