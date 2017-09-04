const chalk = require('chalk');

const chalkInfo = chalk.bgBlue.white;
const chalkWarn = chalk.bgRed.white;

module.exports = (channel, enabled, length, client, config) => {
    if(enabled == true){
        console.log(chalkInfo(`Slowmode enabled.`));
        client.say(channel, `Slowmode has been enabled in the chat. BrainSlug`);
    }else{
        console.log(chalkInfo(`Slowmode disabled.`));
        client.say(channel, `Slowmode has been disabled in the chat. MorphinTime`);
    }
    
}