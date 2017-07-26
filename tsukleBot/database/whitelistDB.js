const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/bot.db');

module.exports = {
    createTable: function(){
        db.serialize(() => {
            let statement = db.prepare("CREATE TABLE IF NOT EXISTS whitelist (username TEXT)");
            statement.run();
            statement.finalize();
        });
    },

    addUser: function(username){
        db.serialize(() => {
            let statement = db.prepare("INSERT into whitelist values(?)");
            statement.run(username);
            statement.finalize();
        });
    },

    removeUser: function(username){
        db.serialize(() => {
            let statement = db.prepare("DELETE FROM whitelist WHERE username=?");
            statement.run(username);
            statement.finalize();
        });
    },

    findUser: function (username, callback){
        db.serialize(() => {
            let statement = db.prepare("SELECT username FROM whitelist WHERE username = ?");
            statement.get(username, (err, row) => {
                if (err){
                    console.log(err);
                    callback(null);
                }
                else if(row === undefined){
                    callback(null);
                }
                else{
                    callback(row);
                }
            });
            statement.finalize();
        });
    },

    currentUsers: function (callback){
        db.serialize(() => {
            let statement = db.prepare("SELECT rowid AS id, username FROM whitelist");
            statement.all((err, rows) => {
                if(err){
                    console.log(err);
                    callback(null);
                }

                else if(rows == undefined){
                    callback(null);
                }

                else{
                    callback(rows);
                }
            });
        });
    }
}