const chalk = require('chalk');

const chalkInfo = chalk.bgBlue.white;
const chalkWarn = chalk.bgRed.white;

module.exports = (reason, client, config) => {
    console.log(chalkInfo(`Reconnecting...`));
}