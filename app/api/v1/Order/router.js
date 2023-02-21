const express = require('express');
const router = express();
const { index } = require('./controller');
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth')

router.get('/orders', authenticateUser, authorizeRoles(
    'admin',
    'owner',
    'organizer'), index);



module.exports = router; //this command is to make this router can be accessible by app.js