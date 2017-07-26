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
setInterval(() => {
    announcementDB.currentAnnouncement((result) => {
        if(result == null) return;
        client.action("#tsukle", `[ANNOUNCEMENT] ${result.announcement}`);
        console.log("Announcement found and announced.");
    });
    console.log("Interval called.");
}, 300000); 

//twitch event loader
require('./util/eventLoader')(client, config);

//connect to twitch
client.connect();