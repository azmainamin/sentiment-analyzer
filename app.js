var express           = require('express'),
    app               = express(),
    sentiment         = require('./controllers/sentimentAnalyzerController'),
    twitterController = require('./controllers/twitterController');
    
    
app.set("view engine", "ejs");
app.use(express.static("public"));



//Routes
app.get("/", function(req,res){
    res.render("index"); 
});

app.get("/tweets", (req,res) => {
    var sentimentScoreFromSentiment = [];
    var client  = twitterController.initTwitterApi();
    
    twitterController.getListOfTweets(client, "#metoo").then((tweetList) => {
        if(tweetList == null){
            res.render('error');
        }
        tweetList.forEach(tweet => {
            var sentimentValue = sentiment.analzyeSentiment(tweet);
            sentimentScoreFromSentiment.push(sentimentValue);
        })
        res.render("tweets", {
                              tweetList: tweetList, 
                              sentimentScores: sentimentScoreFromSentiment
                             }
        );
    });
    // error handling
     twitterController.getListOfTweets(client, "#metoo").catch(error => {
         console.log("Error: " + error);
         res.render('error');
     })

    
});
// Configure server port
app.listen(
    process.env.PORT,
    process.env.IP,
    function(){
        console.log("App Started");
    });