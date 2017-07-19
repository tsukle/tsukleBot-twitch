const chalk = require('chalk');

const chalkInfo = chalk.bgBlue.white;
const chalkWarn = chalk.bgRed.white;

module.exports = (channel, username, reason, duration, client, config) => {
    console.log(chalkInfo(`User has been timed out: ${username} | ${reason} | ${duration}`));
}