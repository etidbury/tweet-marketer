module.exports=function() {

    var c = rootRequire('config');
    var fs = require('fs');

    var self = this;


    var generateTweetUserQueueFileURI=function(Tweet){
        return c.SYSTEM.URI.TWEET_USER_QUEUE+Tweet.user.id_str+".json";
    };


    /**
     *
     * @param Tweet User will be extracted from this tweet
     * @param onComplete Upon writing the file
     */
    self.addToQueue=function(Tweet,onComplete) {
        return fs.writeFile(generateTweetUserQueueFileURI(Tweet),JSON.stringify(Tweet.user),onComplete);
    };


    var filterNewestFile=function(files, path) {
        var out = [];
        files.forEach(function(file) {
            var stats = fs.statSync(path + "/" +file);
            if(stats.isFile()) {
                out.push({"file":file, "mtime": stats.mtime.getTime()});
            }
        });
        out.sort(function(a,b) {
            return b.mtime - a.mtime;
        });
        return (out.length>0) ? out[0].file : "";
    };

    /**
     *
     * @param onComplete Returns TweetUser in first argument
     */
    self.getNextInQueue=function(onComplete) {

        fs.readdir(c.SYSTEM.URI.TWEET_USER_QUEUE, function(err, files) {

            if (err){
                onComplete("Failed to read Tweet User Queue: "+err);
                return;
            }


            var newestItem = filterNewestFile(files, c.SYSTEM.URI.TWEET_USER_QUEUE);

            var newestTweetFileURI=c.SYSTEM.URI.TWEET_USER_QUEUE+newestItem;

            console.log("newst",newestTweetFileURI);


            var data=fs.readFileSync(newestTweetFileURI);

            var TweetUser=JSON.parse(data);


            console.log(TweetUser);

            onComplete(err,TweetUser);
        });


    };


    self.removeFromQueue=function(TweetUser,onComplete){
        fs.unlink(c.SYSTEM.URI.TWEET_USER_QUEUE+"",function(err){
            onComplete(err,TweetUser);
        });
    };

    return self;

};