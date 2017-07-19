const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/bot.db');

module.exports = {
    createTable: function(){
        db.serialize(() => {
            let statement = db.prepare("CREATE TABLE IF NOT EXISTS announcements (announcement TEXT, id TEXT)");
            statement.run();
            statement.finalize();
        });
    },

    addAnnouncement: function(announcement, id){
        db.serialize(() => {
            let statement = db.prepare("INSERT into announcements values(?, ?)");
            statement.run(announcement, id);
            statement.finalize();
        });
    },

    removeAnnouncement: function(announcement){
        db.serialize(() => {
            let statement = db.prepare("DELETE * FROM announcements");
            statement.run(command);
            statement.finalize();
        });
    },

    updateAnnouncement: function(initialID, newAnnouncement){
        db.serialize(() => {
            let statement = db.prepare("UPDATE announcements SET announcement = ? WHERE id = ?");
            statement.run(newAnnouncement, initialID).catch(console.error);
            statement.finalize();
        });
    },

    currentAnnouncement: function (callback){
        db.serialize(() => {
            let statement = db.prepare("SELECT announcement FROM announcements");
            statement.all((err, rows) => {
                if(err){
                    console.log(err);
                    callback(null);
                }

                else if(rows == undefined){
                    callback(null);
                }

                else{
                    callback(rows.announcement);
                }
            });
        });
    }
}