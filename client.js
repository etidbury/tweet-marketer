var Twit = require('twit');
var c = rootRequire('config');
var fs = require('fs');


/*---debug---*/
var fs=require('fs');

/*----debug----*/
const Console = require('console').Console;
const output = fs.createWriteStream(c.SYSTEM.URI.TWEETED_LOG_FILE);
const errorOutput = fs.createWriteStream(c.SYSTEM.URI.TWEETED_LOG_ERROR_FILE);
// custom simple logger
global.tweetLogger = new Console(output, errorOutput);
/*---debug---*/

var TweetedUsersConstraintUtil = rootRequire('lib/TweetedUsersConstraintUtil')();
var TweetUserQueueUtil = rootRequire('lib/TweetUserQueueUtil')();


var credentials = {
    consumer_key: 'BTHKUjsPwniAeOrZtIzfEpHqo',
    consumer_secret: 'bIf3cdMcd5sNXHbHCFJamBhcRda0i0salliFuof9aN5pCT32Xv',
    access_token: '822189669555257346-zrmL1gsoIA6fOjICAmHJKTQFvw7DvHQ',
    access_token_secret: 'EwnDWsQuuiU6RZaLCyFPuAl0NKTc1ZA6iqnuIA3ksy0oA',
    timeout_ms: 20 * 1000  // optional HTTP request timeout to apply to all requests.
};//jerrybob21

var T = new Twit(credentials);

var stream = T.stream('statuses/filter', {track: c.TWEET_TO_HASHTAGS, language: 'en'});

var i = 0;

stream.on('tweet', function (Tweet) {

    if (!TweetedUsersConstraintUtil.alreadyTweetedUser(Tweet)) {
        TweetUserQueueUtil.addToQueue(Tweet, function (err) {

            if (err) {
                console.error("Failed to add tweet user to queue", err);
                return;
            }

            tweetLogger.log("Sup");

            tweetLogger.error("random error Sup");

            console.debug("Added user to queue: " + Tweet.user.name);


        });
    } else {

        console.debug("User:", Tweet.user.name, "already tweeted - skipping...");

    }

});



var postTweetFromQueue=function() {

    TweetUserQueueUtil.getNextInQueue(function onComplete(err,TweetUser){
        if (err){
            console.error("Failed to get user from queue");
            return;
        }




        //T.post('')



        setTimeout(function(){
            postTweetFromQueue();
        },10000);
        postTweetFromQueue();
    });

};


postTweetFromQueue();












   
