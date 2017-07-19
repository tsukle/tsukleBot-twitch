const commandDB = require('../database/commandDB.js');

exports.run = function(args, isSub, message, channel, userstate, client, config){
    let newChannel = channel.slice(1);
    if(userstate["username"] != newChannel) return;

    let firstSplit = args.split("<").slice(1);
    let initialCommand = firstSplit[0].split(">")[0];
    let newCommand = firstSplit[1].split(">")[0];
    let newMod = firstSplit[2].split(">")[0];
    let newResponse = firstSplit[3].split(">")[0];

    commandDB.updateCommand(initialCommand, newCommand, newResponse, newMod);
}