var express             = require('express'),
    app                 = express(),
    sentimentController = require('./controllers/sentimentAnalyzerController'),
    twitterController   = require('./controllers/twitterController'),
    bodyParser          = require('body-parser');


app.set("view engine", "ejs");
app.use(express.static("static"));
app.use(bodyParser.urlencoded({ extended: true }));


//Routes
app.get("/", function(req, res) {
    res.render("index");
});

app.post("/tweets", (req, res) => {
    var sentimentScoreFromSentiment = [],
        queryString = req.body.query_string,
        limit = req.body.limit;

    
    if (!_isUserInputValid(queryString, limit)) {
        res.render("index");
    }

    var calledFunction = twitterController.getListOfTweets(queryString, limit);
    calledFunction.then((tweetList) => {
        tweetList.forEach(tweet => {
            var sentimentValue = sentimentController.analzyeSentiment(tweet);
            sentimentScoreFromSentiment.push(sentimentValue);
        })
        res.render("tweets", {
            tweetList: tweetList,
            sentimentScores: sentimentScoreFromSentiment
        });
    });
    // error handling
    calledFunction.catch(error => {
        console.log("Error");
        res.render('error');
    })


});
//helper functions

function _isUserInputValid(queryString, count) {
    if (typeof queryString != undefined && typeof count != undefined) {
        return true;
    }
}

// Configure server port
app.listen(
    process.env.PORT,
    process.env.IP,
    function() {
        console.log("App Started...");
    });
