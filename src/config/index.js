require("dotenv").config();

module.exports.Config = {
    port: process.env.SERVER_PORT,
    mongoUri: process.env.MONGODB_URI,
    mongoName: process.env.MONGODB_NAME,
};
