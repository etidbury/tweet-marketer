module.exports=function(){

    var c=rootRequire('config');
    var fs=require('fs');


    var self=this;

    var generateUserAuthFileURI=function(twitterUserID){
        return c.SYSTEM.URI.USER_AUTH+twitterUserID+".json";
    };



    self.getInfo=function(twitterUserID){
        return JSON.parse(fs.readFileSync(generateUserAuthFileURI(twitterUserID)));
    };

    self.setInfo=function(twitterUserID,data){
        return fs.writeFileSync(generateUserAuthFileURI(twitterUserID),JSON.stringify(data));
    };


    return self;


};