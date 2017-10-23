<h1>Sentiment Analyzer</h1>


Summary: Search tweets by a query string and analyze their sentiment. 

To Run: 
1. You will need to get access tokens and keys from Twitter Developer's portal for this
app to run.To get your tokens and key follow instructions from here: https://www.slickremix.com/docs/how-to-get-api-keys-and-tokens-for-twitter/

2. Once you have all the necessary tokens and keys, there are two ways of plugging them in:
    <ul>
    <li> Replace process.env.VARIABLE_NAME with the appropriate token/key in "twitterController._initTwitter function". </li>
    <li> Create a .env file in the root directory, and save your tokens/keys as a Key-Value pair, with the Keys being: </li>
        
        export TWITTER_CONSUMER_KEY=
        export TWITTER_CONSUMER_SECRET=
        exporrt TWITTER_ACCESS_TOKEN_KEY=
        export TWITTER_ACCESS_TOKEN_SECRET=

        Make sure you have env2 package installed. 

    </ul>
