module.exports=function(){

    var c=rootRequire('config');

    var self=this;

    var generateTweetUsersFileURI=function(Tweet){
        return c.SYSTEM.URI.TWEETED_USERS+Tweet.user.id_str+".json";
    };


    self.alreadyTweetedUser=function(Tweet){
        try {
            var stat=fs.lstatSync(generateTweetUsersFileURI(Tweet));

        }catch (err){
            return false;
        }
        return stat.isFile();
    };

    self.recordTweetToUser=function(Tweet){
        return fs.writeFileSync(generateTweetUsersFileURI(Tweet),JSON.stringify(Tweet.user));
    };




    return self;


};