const express = require('express');
const signInCms = require('./controller');
const router = express();

router.post('/auth/signin', signInCms);

module.exports = router; //this command is to make this router can be accessible by app.js