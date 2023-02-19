const express = require('express');
const router = express();
const { createCmsOrganizer, createCmsUser, getCmsUsers } = require('./controller');
const {
    authenticateUser,
    authorizeRoles,
    // authenticateParticipant
} = require('../../../middlewares/auth')

router.get('/users', authenticateUser, authorizeRoles('organizer'), getCmsUsers);
router.post('/organizers', authenticateUser, authorizeRoles('owner'), createCmsOrganizer);
router.post('/users', authenticateUser, authorizeRoles('organizer'), createCmsUser);

module.exports = router; //this command is to make this router can be accessible by app.js