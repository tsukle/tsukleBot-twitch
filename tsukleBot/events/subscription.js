const chalk = require('chalk');

const chalkInfo = chalk.bgBlue.white;
const chalkWarn = chalk.bgRed.white;

module.exports = (channel, username, method, message, userstate, client, config) => {
    console.log(chalkInfo(`Subscription: ${username} | ${method} | ${message}`));
    client.say(channel, `bleedPurple Thanks for subbing ${username}! bleedPurple`);
}