const express = require('express');
const router = express();
const {
    signUp,
    activeParticipant,
    signIn,
    getAllLandingPage,
    getDetailLandingPage,
    getDashboard,
    checkout,
    getAllPayment
} = require('./controller');
const { authenticateParticipant } = require('../../../middlewares/auth')

router.post('/participants/auth/signup', signUp);

router.post('/participants/auth/signin', signIn);

router.put('/active', activeParticipant);

router.get('/events', getAllLandingPage);

router.get('/events/:id', getDetailLandingPage);

router.get('/orders', authenticateParticipant, getDashboard);

router.post('/checkout', authenticateParticipant, checkout);

router.get('/payments/:organizer', authenticateParticipant, getAllPayment);


module.exports = router; //this command is to make this router can be accessible by app.js