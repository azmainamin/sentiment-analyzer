var twitterController = require('../controllers/twitterController');


describe("_isRetweet", () => {
    it("Returns true when tweet starts with RT. ", () => {
        expect(twitterController._isRetweet("RT This is a retweet.")).toEqual(true);
    });

    it("Returns false when tweet doesn't start with RT.", () => {
        expect(twitterController._isRetweet("This is a tweet.")).toEqual(false);
    });
});


describe("_validateCount(tweetList, countFromUser)", () => {
    it("Returns length of tweetlist if the length is less than countFromUser", () => {
        var lengthOfTweetList = twitterController._validateCountAndReturnTweetList(new Array(10), 20).length;
        expect(lengthOfTweetList).toEqual(10);
    });

    it("Returns countFromUser if the length of tweetList is more than countFromUser", () => {
        var lengthOfTweetList = twitterController._validateCountAndReturnTweetList(new Array(20), 10).length;
        expect(lengthOfTweetList).toEqual(10);
    });
});

describe("getListOfTweets(queryString, countFromUser)", () => {
    it("Returns a list of tweets with atleast 1 tweet.", (done) => { // done will force the async call to finish.
        var countFromUser = 10;
        //var calledFunction = twitterController.getListOfTweets("chelsea");
        twitterController.getListOfTweets("chelsea").then((tweetList) => {
            expect(tweetList.length).toBeLessThan(11);
            expect(tweetList.length).toBeGreaterThan(0);
            expect(tweetList).not.toBeNull();
            done();
        });
    });

});
