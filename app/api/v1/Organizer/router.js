const express = require('express');
const router = express();
const { createCmsOrganizer, createCmsUser } = require('./controller');
const {
    authenticateUser,
    // authenticateParticipant
} = require('../../../middlewares/auth')


router.post('/organizers', createCmsOrganizer);
router.post('/users', authenticateUser, createCmsUser);

module.exports = router; //this command is to make this router can be accessible by app.js