module.exports=function(){

    var c=rootRequire('config');

    var fs=require('fs');


    var self=this;

    var generateTweetUsersFileURI=function(Tweet){
        return c.SYSTEM.URI.TWEETED_USERS+Tweet.user.id_str+".json";
    };

    var generateTweetUsersFileURIByUser=function(TweetUser){
        return c.SYSTEM.URI.TWEETED_USERS+TweetUser.id_str+".json";
    };


    self.alreadyTweetedUser=function(TweetUser){
        try {
            var stat=fs.lstatSync(generateTweetUsersFileURI(TweetUser));

        }catch (err){
            return false;
        }
        return stat.isFile();
    };

    self.recordTweetToUser=function(TweetUser){
        return fs.writeFileSync(generateTweetUsersFileURIByUser(TweetUser),JSON.stringify(TweetUser));
    };




    return self;


};