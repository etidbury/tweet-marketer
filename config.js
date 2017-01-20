var config={};


config.CONSUMER_KEY="BTHKUjsPwniAeOrZtIzfEpHqo";
config.CONSUMER_SECRET="bIf3cdMcd5sNXHbHCFJamBhcRda0i0salliFuof9aN5pCT32Xv";
config.SERVER_PORT="3002";

config.TWEET_TO_HASHTAGS="#trump";


config.SYSTEM={};
config.SYSTEM.OUTPUT_FOLDER_PERMISSIONS='0744';


config.SYSTEM.URI={};
config.SYSTEM.URI.OUTPUT=__dirname+"/out/";
config.SYSTEM.URI.TWEETED_USERS=config.SYSTEM.URI.OUTPUT+'tweeted_users/';
config.SYSTEM.URI.TWEET_USER_QUEUE=config.SYSTEM.URI.OUTPUT+'tweet_user_queue/';

config.OPTION={};
config.OPTION.TWEETS={};
config.OPTION.TWEETS.NO_RETWEETS=false;





/*
 jerrybob21

 Jerry Bob

 edwardtidbury@gmail.com
 yellowdog


 */

module.exports=config;