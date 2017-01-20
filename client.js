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

var stream = T.stream('statuses/filter', {track: c.OPTION.FILTER_HASHTAG, language: 'en'});


var Twitter = require('twitter');

var twitterBot = new Twitter({
    consumer_key: 'NATchpgF0k3gU680MU1kRzV3w',
    consumer_secret: 'nFq22wlcCV8UAsgfmDSS9yx9LBUzigJZiyweWEOmD4WKGzwAZd',
    access_token_key: '822085776397701120-lD0VX61euET6orJYyCYUCrx8qTm5pZY',
    access_token_secret: 'hgtzsyjm0qXnS6XP3E2Mme0quRVkjYd4ZcB5TMlXQHXdD'
});


stream.on('tweet', function (Tweet) {

    if (!TweetedUsersConstraintUtil.alreadyTweetedUser(Tweet.user)) {
        TweetUserQueueUtil.addToQueue(Tweet, function (err) {

            if (err) {
                console.error("Failed to add tweet user to queue", err);
                return;
            }


            //console.debug("Added user to queue: " + Tweet.user.name);


        });
    } else {

        console.debug("User:", Tweet.user.name, "already tweeted - skipping...");

    }

});


var postTweetFromQueue=function() {

    console.log("Get next in queue...");

    TweetUserQueueUtil.getNextInQueue(function onComplete(err,TweetUser){
        if (err){
            console.error("Failed to get user from queue:",err);
            return;
        }


        var statusMessage= c.OPTION.TWEET_LINK+ ' '+Math.round(Math.random()*1000)+' @'+TweetUser.screen_name;

        console.log("Tweeting:",statusMessage);

        twitterBot.post('statuses/update', {status: statusMessage},  function(error, Tweet, response) {

            if(error) {
                console.error(error);
            }else {
                TweetedUsersConstraintUtil.recordTweetToUser(TweetUser);

                if (Tweet) {
                    console.log('Sent tweet', Tweet.text, " (ID:", Tweet.id, ")");
                }
            }


            setTimeout(function(){
                postTweetFromQueue();
            },c.OPTION.TWEET_SEND_INTERVAL>10000?c.OPTION.TWEET_SEND_INTERVAL:10000);


        });




    });

};

postTweetFromQueue();












   
