const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth');


router.get('/talents', authenticateUser, authorizeRoles('organizer'), index);

router.post('/talents', authenticateUser, authorizeRoles('organizer'), create);

router.get('/talents/:id', authenticateUser, authorizeRoles('organizer'), find);

router.put('/talents/:id', authenticateUser, authorizeRoles('organizer'), update);

router.delete('/talents/:id', authenticateUser, authorizeRoles('organizer'), destroy);

module.exports = router; //this command is to make this router can be accessible by app.js