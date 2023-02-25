const express = require('express');
const router = express();
const {
    signUp,
    activeParticipant,
    signIn,
    getAllLandingPage,
    getDetailLandingPage,
    getDashboard
} = require('./controller');
const { authenticateParticipant } = require('../../../middlewares/auth')

router.post('/participants/auth/signup', signUp);

router.post('/participants/auth/signin', signIn);

router.put('/active', activeParticipant);

router.get('/events', getAllLandingPage);

router.get('/events/:id', getDetailLandingPage);

router.get('/orders', authenticateParticipant, getDashboard);

router.get('/dashboard/:id', (req, res) => {
    res.status(200).json({
        message: 'get detail dashboard by id',
    });
});


module.exports = router; //this command is to make this router can be accessible by app.js