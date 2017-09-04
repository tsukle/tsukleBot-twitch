const chalk = require('chalk');

const chalkInfo = chalk.bgBlue.white;
const chalkWarn = chalk.bgRed.white;

module.exports = (channel, username, months, message, userstate, methods, client, config) => {
    console.log(chalkInfo(`Resub: ${username} | ${months} | ${message}`));
    client.say(channel, `bleedPurple ${username} just resubbed! Thank you! bleedPurple`);
}