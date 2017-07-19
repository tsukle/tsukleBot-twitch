const chalk = require('chalk');

const chalkInfo = chalk.bgBlue.white;
const chalkWarn = chalk.bgRed.white;

module.exports = (channel, target, viewers, client, config) => {
    console.log(chalkInfo(`${channel} is now hosting ${target} with ${viewers} viewers.`));
}