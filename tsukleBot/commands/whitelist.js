const whitelistDB = require('../database/whitelistDB.js');
const chalk = require('chalk');

const chalkInfo = chalk.bgBlue.white;
const chalkWarn = chalk.bgRed.white;

exports.run = function(args, isSub, message, channel, userstate, client, config){
    if(userstate["username"] != channel || userstate["mod"] != true) return;

    let firstSplit = args.split("<").slice(1);
    let username = firstSplit[0].split(">")[0];

    whitelistDB.addUser(username);

    client.say(channel, `${username}, you are now whitelisted to post one link in the chat.`)
}