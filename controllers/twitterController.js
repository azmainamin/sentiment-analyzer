var Twitter = require("twitter"),
    env = require('env2')('./.env');

function initTwitterApi(){
  
  var client = new Twitter({
  consumer_key:  process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
}); 
  return client;
}

function getListOfTweets(client, queryString){

    return new Promise((resolve,reject) => {
        var tweetList = [];
        client.get('search/tweets', {q: queryString, count: 10, tweet_mode: "extended" }, function(error, tweets, response) {
              if(!error){
                 var data = tweets['statuses'];
                 data.forEach(tweet => tweetList.push(tweet["full_text"]));
                 resolve(tweetList);
              }else reject(error);
        });
    });
}

module.exports = {
    initTwitterApi,
    getListOfTweets
}