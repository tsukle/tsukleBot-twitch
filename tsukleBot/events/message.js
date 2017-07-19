const chalk = require('chalk');

const chalkInfo = chalk.bgBlue.white;
const chalkWarn = chalk.bgRed.white;

module.exports = (channel, userstate, message, self, client, config) => {
    if(self == true) return;

    if(message.startsWith(config.prefix)){
        const command = message.split(' ')[0].slice(config.prefix.length);

        // Middle-man stuff.
        const newMessage = message.split(' ');
        const removeCommand = newMessage.shift();

        const args = newMessage.join(' ');
        const isSub = userstate["subscriber"];


        //Trying for a command file.
         try{
            let commandFile = require(`../commands/${command}`);
            commandFile.run(args, isSub, message, channel, userstate, client, config);
        }catch(e){
            let catcher = require(`../commands/commandCatcher/catcher`);
            catcher.run(command, args, isSub, message, channel, userstate, client, config);
        }
    }
}