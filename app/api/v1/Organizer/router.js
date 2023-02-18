const express = require('express');
const router = express();
const { createCmsOrganizer } = require('./controller');


router.post('/organizers', createCmsOrganizer);

module.exports = router; //this command is to make this router can be accessible by app.js