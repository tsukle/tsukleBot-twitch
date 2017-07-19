const announcementDB = require('../database/announcementDB.js');

exports.run = function(args, isSub, message, channel, userstate, client, config){
    let newChannel = channel.slice(1);
    if(userstate["username"] != newChannel) return;
    let firstSplit = args.split("<").slice(1);
    let announcement = firstSplit[0].split(">")[0];
    let id = firstSplit[1].split(">")[0];

    announcementDB.addAnnouncement(announcement, id);
}