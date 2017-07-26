const domainDB = require('../database/domainDB.js');

exports.run = function(args, isSub, message, channel, userstate, client, config){
    let newChannel = channel.slice(1);
    if(userstate["username"] != newChannel) return;

    let firstSplit = args.split("<").slice(1);
    let domain = firstSplit[0].split(">")[0];

    domainDB.addDomain(domain);
}