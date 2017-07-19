const chalk = require('chalk');

const chalkInfo = chalk.bgBlue.white;
const chalkWarn = chalk.bgRed.white;

module.exports = (channel, enabled, length, client, config) => {
    if(enabled == true){
        console.log(chalkInfo(`Slowmode enabled.`));
    }else{
        console.log(chalkInfo(`Slowmode disabled.`));        
    }
    
}