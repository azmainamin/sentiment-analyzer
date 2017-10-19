var sentiment = require("sentiment");


function analzyeSentiment(text){
    var sentimentScore = sentiment(text)["score"];
    return sentimentScore;
}

module.exports = {
    analzyeSentiment
}