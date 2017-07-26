const whitelistDB = require('../database/whitelistDB.js');

exports.run = function(args, isSub, message, channel, userstate, client, config){
    let newChannel = channel.slice(1);
    if(userstate["username"] != newChannel || userstate["mod"] != true) return;

    let firstSplit = args.split("<").slice(1);
    let username = firstSplit[0].split(">")[0];

    whitelistDB.addUser(username);

    client.say("#tsukle", `${username}, you are now whitelisted to post one link in the chat.`)
}