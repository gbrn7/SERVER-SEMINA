const express = require('express');
const router = express();
const {
    index,
    create,
    find,
    update,
    destroy
} = require('./controller')
const {
    authenticateUser,
    authorizeRoles,
} = require('../../../middlewares/auth');

router.get('/payments', authenticateUser, authorizeRoles('organizer'), index);

router.post('/payments', authenticateUser, authorizeRoles('organizer'), create);

router.get('/payments/:id', authenticateUser, authorizeRoles('organizer'), find);

router.put('/payments/:id', authenticateUser, authorizeRoles('organizer'), update);

router.delete('/payments/:id', authenticateUser, authorizeRoles('organizer'), destroy);

module.exports = router; //this command is to make this router can be accessible by app.js