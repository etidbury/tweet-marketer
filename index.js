
global.rootRequire=function(name){
    return require(__dirname+"/"+name);
};
var c=rootRequire('config');

/*----/debug----*/
global.console.debug=console.log;






var fs = require('fs');

function ensureExists(path, mask, cb) {
    if (typeof mask == 'function') { // allow the `mask` parameter to be optional
        cb = mask;
        mask = '0777';
    }
    fs.mkdir(path, mask, function(err) {
        if (err) {
            if (err.code == 'EEXIST') cb(null); // ignore the error if the folder already exists
            else cb(err); // something else went wrong
        } else cb(null); // successfully created folder
    });
}

console.log("Setting up environment...");

ensureExists(c.SYSTEM.URI.OUTPUT,c.SYSTEM.OUTPUT_FOLDER_PERMISSIONS,function(err){
    if (err){
        console.error("FS Error: Failed to create directory ",c.SYSTEM.URI.OUTPUT,err);
        return;
    }
    console.log("Created",c.SYSTEM.URI.OUTPUT);

    ensureExists(c.SYSTEM.URI.TWEETED_USERS,c.SYSTEM.OUTPUT_FOLDER_PERMISSIONS,function(err){
        if (err){
            console.error("FS Error: Failed to create directory ",c.SYSTEM.URI.TWEETED_USERS,err);
            return;
        }
        console.log("Created",c.SYSTEM.URI.TWEETED_USERS);

        ensureExists(c.SYSTEM.URI.TWEET_USER_QUEUE,c.SYSTEM.OUTPUT_FOLDER_PERMISSIONS,function(err) {
            if (err) {
                console.error("FS Error: Failed to create directory ", c.SYSTEM.URI.TWEETED_USERS, err);
                return;
            }

            ensureExists(c.SYSTEM.URI.USER_AUTH,c.SYSTEM.OUTPUT_FOLDER_PERMISSIONS,function(err) {
                if (err) {
                    console.error("FS Error: Failed to create directory ", c.SYSTEM.URI.TWEETED_USERS, err);
                    return;
                }

                console.log("Created", c.SYSTEM.URI.USER_AUTH);

                console.log("Setting up client...");
                rootRequire('client');
            });

        });

    });


});
