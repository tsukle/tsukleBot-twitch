const chalk = require('chalk');

const chalkInfo = chalk.bgBlue.white;
const chalkWarn = chalk.bgRed.white;

module.exports = (channel, viewers, client, config) => {
    console.log(chalkInfo(`${channel} has now stopped hosting with ${viewers} viewers.`));
    client.say(channel, `No longer hosting any channels. riPepperonis`);
}