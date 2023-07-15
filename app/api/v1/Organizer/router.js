const express = require('express');
const router = express();
const {
    createCmsOrganizer,
    createCmsUser,
    getCmsUsers,
    getCmsAdmin,
    destroyAdmin,
    updateCmsAdmin,
    find,
    getCmsOrganizers,
    updateCmsOrganizer
} = require('./controller');

const {
    authenticateUser,
    authorizeRoles,
    // authenticateParticipant
} = require('../../../middlewares/auth')

router.get('/users', authenticateUser, authorizeRoles('owner'), getCmsUsers);

router.get('/users/:id', authenticateUser, authorizeRoles('organizer', 'owner'), find);

router.get('/organizers', authenticateUser, authorizeRoles('owner'), getCmsOrganizers);

router.post('/organizer', authenticateUser, authorizeRoles('owner'), createCmsOrganizer);

router.put('/organizer/:id', authenticateUser, authorizeRoles('owner'), updateCmsOrganizer);

router.post('/admin', authenticateUser, authorizeRoles('organizer', 'owner',), createCmsUser);

router.put('/admin/:id', authenticateUser, authorizeRoles('organizer'), updateCmsAdmin);

router.get('/admin', authenticateUser, authorizeRoles('organizer'), getCmsAdmin);

router.delete('/admin/:id', authenticateUser, authorizeRoles('organizer'), destroyAdmin);

module.exports = router; //this command is to make this router can be accessable by app.js