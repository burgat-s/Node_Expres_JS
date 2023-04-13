const { MongoClient } = require("mongodb");
const debug = require("debug")(`app:database-index`);
const { Config } = require('../config');

var connection = null;
module.exports.Database = (collection) =>
    new Promise(async (resolve, reject) => {
        try {
            if (!connection) {
                const client = new MongoClient(Config.mongoUri);
                connection = await client.connect();
                debug(`Nueva Conexión realizada a MongoDB Atlas`);
            } else {
                debug(`Reutilizando Conexión.`);
            }
            const db = connection.db(Config.mongoName);
            resolve(db.collection(collection));
        } catch (error) { 
            debug(error);
            reject(error);
        }
    });
