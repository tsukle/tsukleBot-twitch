//Imports
const tmi = require('tmi.js');
const config = require('./config/config.json');

const commandDB = require('./database/commandDB.js');
const announcementDB = require('./database/announcementDB.js');
const domainDB = require('./database/domainDB.js');
const whitelistDB = require('./database/whitelistDB.js');

//tmi options
let options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: config.username,
        password: config.authkey
    },
    channels: config.channels
};

//client construction with options
const client = new tmi.client(options);

//Table creation
commandDB.createTable();
announcementDB.createTable();
domainDB.createTable();
whitelistDB.createTable();

//Announcements.
//Main announcement.
setInterval(() => {
    announcementDB.currentAnnouncement((result) => {
        if(result == null) return;
        client.say("#tsukle", `GivePLZ ${result.announcement} TakeNRG`);
        console.log("Announcement found and announced.");
    });
    console.log("Interval called.");
}, 600000);
//Plans to expand announcement to Prime and Social stuff outside of typical announcements.

//twitch event loader
require('./util/eventLoader')(client, config);

//connect to twitch
client.connect();