const mongoose = require('mongoose'); //import package mongoose

const { urlDb } = require('../config'); //import mongo db configuration in config.js

mongoose.connect(urlDb); //connect to mongodb with configuration on config.js

const db = mongoose.connection; //save the connection into constant variable

module.exports = db; // export db in order to be able used by another file