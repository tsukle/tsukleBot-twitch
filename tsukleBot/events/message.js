const chalk = require('chalk');
const domainDB = require('../database/domainDB.js');
const whitelistDB = require('../database/whitelistDB.js');

const chalkInfo = chalk.bgBlue.white;
const chalkWarn = chalk.bgRed.white;

module.exports = (channel, userstate, message, self, client, config) => {
    if(self == true) return;

    hyperlinkTest(client, message, userstate);

    if(message.startsWith(config.prefix)){
        const command = message.split(' ')[0].slice(config.prefix.length);

        // Inbetween stuff.
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

function hyperlinkTest(client, message, userstate){
    let urlArray = ["that link is definitely not whitelisted.", "you must be whitelisted to send this link.", "not cool."];
    let expression = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    let linkTest = new RegExp(expression);
    if(linkTest.test(message)) {
        let result = linkTest[Symbol.match](message);
        let fullURL = result[0];
        let shortURL = fullURL.split("/")[0];
        domainDB.findDomain(shortURL, (domain) =>{
            console.log(domain);
            if(domain != null){
                return;
            }
            else{
                whitelistDB.findUser(userstate["display-name"], (user) => {
                    console.log(user);
                    if(user != null){
                        whitelistDB.removeUser(user.username);
                        client.say("#tsukle", `${userstate["display-name"]}, you just used up your whitelist.`);
                        return;
                    }
                    else{
                        client.timeout("#tsukle", userstate["username"], 1, "Sending non-whitelisted URLS.");
                        client.say("#tsukle", `${userstate["username"]}, ${urlArray[Math.floor((Math.random() * 3))]}`); 
                    }
                });
            }
        });
    } else {
        return;
    }
}