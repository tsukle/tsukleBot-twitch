const commandDB = require('../database/commandDB.js');

exports.run = function(args, isSub, message, channel, userstate, client, config){
    let newChannel = channel.slice(1);
    if(userstate.username != newChannel) return;
    
    let firstSplit = args.split("<").slice(1);
    let command = firstSplit[0].split(">")[0];

    commandDB.removeCommand(command);
}