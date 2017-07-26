const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/bot.db');

module.exports = {
    createTable: function(){
        db.serialize(() => {
            let statement = db.prepare("CREATE TABLE IF NOT EXISTS domains (domain TEXT)");
            statement.run();
            statement.finalize();
        });
    },

    addDomain: function(domain){
        db.serialize(() => {
            let statement = db.prepare("INSERT into domains values(?)");
            statement.run(domain);
            statement.finalize();
        });
    },

    removeDomain: function(domain){
        db.serialize(() => {
            let statement = db.prepare("DELETE FROM domains WHERE domain=?");
            statement.run(domain);
            statement.finalize();
        });
    },

    updateDomain: function(initialDomain, newDomain){
        db.serialize(() => {
            let statement = db.prepare("UPDATE domains SET domain = ? WHERE domain = ?");
            statement.run(newDomain, initialDomain).catch(console.error);
            statement.finalize();
        });
    },

    findDomain: function (domain, callback){
        db.serialize(() => {
            let statement = db.prepare("SELECT * FROM domains WHERE domain = ?");
            statement.get(domain, (err, row) => {
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

    currentDomains: function (callback){
        db.serialize(() => {
            let statement = db.prepare("SELECT rowid AS id, domain FROM domains");
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