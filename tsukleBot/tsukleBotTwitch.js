//Imports
const tmi = require('tmi.js');
const config = require('./config/config.json');

const commandDB = require('./database/commandDB.js');
const announcementDB = require('./database/announcementDB.js');

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
setInterval((announcement) => {
    announcementDB.currentAnnouncement((announcement) => {
        if(announcement == null) return;
        client.say("#tsukle", announcement);
    });
    console.log("announced.");
}, 5000);

//twitch event loader
require('./util/eventLoader')(client, config);

//connect to twitch
client.connect();