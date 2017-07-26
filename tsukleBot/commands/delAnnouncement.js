const announcementDB = require('../database/announcementDB.js');

exports.run = function(args, isSub, message, channel, userstate, client, config){
    let newChannel = channel.slice(1);
    if(userstate.username != newChannel) return;
    
    announcementDB.removeAnnouncement();
}