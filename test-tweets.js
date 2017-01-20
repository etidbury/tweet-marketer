
var Twit = require('twit');
var c = require('./config');
var fs = require('fs');

var credentials={
    consumer_key:         'BTHKUjsPwniAeOrZtIzfEpHqo',
    consumer_secret:      'bIf3cdMcd5sNXHbHCFJamBhcRda0i0salliFuof9aN5pCT32Xv',
    access_token:         '822189669555257346-zrmL1gsoIA6fOjICAmHJKTQFvw7DvHQ',
    access_token_secret:  'EwnDWsQuuiU6RZaLCyFPuAl0NKTc1ZA6iqnuIA3ksy0oA',
    timeout_ms:           20*1000  // optional HTTP request timeout to apply to all requests.
};//jerrybob21

var T = new Twit(credentials);

var stream = T.stream('statuses/filter', { track: c.TWEET_TO_HASHTAGS, language: 'en' });

var i=0;

stream.on('tweet', function (tweet) {
    console.log(tweet);


    fs.writeFile('test/tweet-'+i+'.json',JSON.stringify(tweet),function(err){
        if (err){
            console.error("Failed to save tweet file:"+err);
            return;
        }
        console.log("saved tweet");
        i++;
        if (i>10)
            process.exit(1);
    })




});
