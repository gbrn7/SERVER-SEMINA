const dotenv = require('dotenv'); //this package is used in order to be able to read variale on .env 
dotenv.config();

module.exports = {
    urlDb: process.env.URL_MONGODB_DEV,
};