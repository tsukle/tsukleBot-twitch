commandDB = require('../database/commandDB.js');

exports.run = function(args, isSub, message, channel, userstate, client, config){
    commandDB.currentCommands((commands) => {
        let commandList = "";
        for(i in commands){
            commandList = `${commandList} !${commands[i]},`;
        }
        client.say(channel, `The current commands are: ${commandList} (@${userstate["username"]})`);
    });
}