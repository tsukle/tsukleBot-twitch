const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/bot.db');

module.exports = {
    createTable: function(){
        db.serialize(() => {
            let statement = db.prepare("CREATE TABLE IF NOT EXISTS commands (command TEXT, response TEXT, mod TEXT)");
            statement.run();
            statement.finalize();
        });
    },

    addCommand: function(command, response, mod){
        db.serialize(() => {
            let statement = db.prepare("INSERT into commands values(?,?,?)");
            statement.run(command, response, mod);
            statement.finalize();
        });
    },

    removeCommand: function(command){
        db.serialize(() => {
            let statement = db.prepare("DELETE FROM commands WHERE command=?");
            statement.run(command);
            statement.finalize();
        });
    },

    updateCommand: function(initialCommand, newCommand, newResponse, newMod){
        db.serialize(() => {
            let statement = db.prepare("UPDATE commands SET command = ?, response = ?, mod = ? WHERE command = ?");
            statement.run(newCommand, newResponse, newMod, initialCommand).catch(console.error);
            statement.finalize();
        });
    },

    findCommand: function (command, callback){
        db.serialize(() => {
            let statement = db.prepare("SELECT * FROM commands WHERE command = ?");
            statement.get(command, (err, row) => {
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

    currentCommands: function (callback){
        db.serialize(() => {
            let statement = db.prepare("SELECT rowid AS id, command, mod FROM commands ORDER BY mod ASC");
            statement.all((err, rows) => {
                if(err){
                    console.log(err);
                    callback(null);
                }

                else if(rows == undefined){
                    callback(null);
                }

                else{
                    let commandArray = rows.map((rows) => {
                        return `${rows.command}`;
                    });
                    callback(commandArray);
                }
            });
        });
    }
}