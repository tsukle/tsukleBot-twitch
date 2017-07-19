commandDB = require('../../database/commandDB.js');

exports.run = function(command, args, isSub, message, channel, userstate, client, config){
    commandDB.findCommand(command, (result) => {
        if(result == null){
            return;
        }else{
            if(result.mod == "true"){
                switch(userstate["mod"]){
                    case true:
                        client.say(channel, `${result.response}. (@${userstate.username})`);
                        break;
                    case false:
                        break;
                    default:
                        return;
                        
                }
            }else{
                client.say(channel, `${result.response}. (@${userstate.username})`);
            }
        }
    });
}