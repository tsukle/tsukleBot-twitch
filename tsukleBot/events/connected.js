const chalk = require('chalk');

const chalkInfo = chalk.bgBlue.white;
const chalkWarn = chalk.bgRed.white;

module.exports = (address, port, client, config) => {
    console.log(chalkInfo(`Connected to: ${address}:${port}`));
}