const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/bot.db');

module.exports = {
    createTable: function(){
        db.serialize(() => {
            let statement = db.prepare("CREATE TABLE IF NOT EXISTS announcements (announcement TEXT, id INTEGER PRIMARY KEY)");
            statement.run();
            statement.finalize();
        });
    },

    addAnnouncement: function(announcement){
        db.serialize(() => {
            let statement = db.prepare("INSERT OR REPLACE INTO announcements values(?, ?)");
            statement.run(announcement, 1);
            statement.finalize();
        });
    },

    removeAnnouncement: function(){
        db.serialize(() => {
            let statement = db.prepare("DELETE FROM announcements WHERE id = 1");
            statement.run();
            statement.finalize();
        });
    },

    updateAnnouncement: function(newAnnouncement){
        db.serialize(() => {
            let statement = db.prepare("UPDATE announcements SET announcement = ? WHERE id = 1");
            statement.run(newAnnouncement, initialID).catch(console.error);
            statement.finalize();
        });
    },

    currentAnnouncement: function(callback){
        db.serialize(() => {
            let statement = db.prepare("SELECT announcement FROM announcements WHERE id = 1");
            statement.get((err, row) => {
                if(err){
                    console.log(err);
                    callback(null);
                }

                else if(row == undefined){
                    callback(null);
                }

                else{
                    callback(row);
                }
            });
            statement.finalize();
        });
    }
}