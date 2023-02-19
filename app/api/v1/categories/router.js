const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth')


router.get('/categories', authenticateUser, authorizeRoles('organizer', 'admin'), index);

router.post('/categories', authenticateUser, authorizeRoles('organizer'), create);

router.get('/categories/:id', authenticateUser, authorizeRoles('organizer'), find);

router.put('/categories/:id', authenticateUser, authorizeRoles('organizer'), update);

router.delete('/categories/:id', authenticateUser, authorizeRoles('organizer'), destroy);

// router.delete('/categories/:id', (req, res) => {
//     res.status(200).json({
//         message: 'delete categories by id',
//     });
// });

module.exports = router; //this command is to make this router can be accessible by app.js