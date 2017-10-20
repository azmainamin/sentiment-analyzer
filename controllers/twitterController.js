var Twitter = require("twitter"),
    env = require('env2')('./.env');



function getListOfTweets(queryString, countFromUser) {
    var client = _initTwitterApi(),
        tweetList = [];

    return new Promise((resolve, reject) => {

        client.get('search/tweets', { q: queryString, count: countFromUser * 10, tweet_mode: "extended" }, function(error, tweets, response) {
            if (!error) {
                var data = tweets['statuses'];
                data.forEach(tweetJSON => {
                    var tweet = tweetJSON["full_text"];
                    if (!_isRetweet(tweet))
                        tweetList.push(tweet);
                });

                resolve(_validateCount(tweetList, countFromUser));
            }
            else reject(error);
        });
    });
}

function _validateCount(tweetList, countFromUser) {
    var result = [];
    if (tweetList.length < countFromUser)
        result = tweetList;
    else result = tweetList.slice(0, countFromUser);
    return result;
}

function _isRetweet(tweet) {
    var RTRegex = new RegExp('^RT');
    return tweet.match(RTRegex) != null;
}


function _initTwitterApi() {

    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });
    return client;
}
module.exports = {
    getListOfTweets
}
