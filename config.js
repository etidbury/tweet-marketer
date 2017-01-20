var c={};
c.SYSTEM={};
c.SYSTEM.URI={};
c.OPTION={};
c.OPTION.TWEETS={};


c.CONSUMER_KEY="POb2gjYEMQlp2iUHRPCZbIf0A";
c.CONSUMER_SECRET="sENfqfqr7TqjqQI9ewF2jU4BsjPvkjHX6eMrSHQPxcmdBqQEsl";
c.SERVER_PORT="3002";

c.SYSTEM.OUTPUT_FOLDER_PERMISSIONS='0744';
c.SYSTEM.URI.OUTPUT=__dirname+"/out/";
c.SYSTEM.URI.USER_AUTH=c.SYSTEM.URI.OUTPUT+'user_auth/';
c.SYSTEM.URI.TWEETED_LOG_FILE=c.SYSTEM.URI.OUTPUT+'tweeted.log';
c.SYSTEM.URI.TWEETED_LOG_ERROR_FILE=c.SYSTEM.URI.OUTPUT+'tweeted_error.log';
c.SYSTEM.URI.TWEETED_USERS=c.SYSTEM.URI.OUTPUT+'tweeted_users/';
c.SYSTEM.URI.TWEET_USER_QUEUE=c.SYSTEM.URI.OUTPUT+'tweet_user_queue/';





c.OPTION.FILTER_HASHTAG="#trump";
c.OPTION.TWEET_LINK="https://au.gt/HMoney";
c.OPTION.TWEET_LINK_POOL=[
    "https://au.gt/HMoney"
    ,"http://bit.ly/2iSNWhA"
    ,"https://goo.gl/yCZgIj"
    ,"http://bit.do/c55G2"
];
c.OPTION.TWEETS.NO_RETWEETS=false;
c.OPTION.TWEET_SEND_INTERVAL=1000*60;




module.exports=c;


/*
 jerrybob21

 Jerry Bob

 edwardtidbury@gmail.com
 yellowdog


 */
