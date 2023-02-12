const express = require('express');
const router = express();

router.get('/events', (req, res) => {
    res.status(200).json({
        message: 'get all events',
    });
});

router.get('/events/:id', (req, res) => {
    res.status(200).json({
        message: 'get detail events by id',
    });
});

router.post('/events/:id/checkout', (req, res) => {
    res.status(200).json({
        message: "checkout events"
    });
});

router.get('/dashboard', (req, res) => {
    res.status(200).json({
        message: 'get dashboard',
    });
});
router.get('/dashboard/:id', (req, res) => {
    res.status(200).json({
        message: 'get detail dashboard by id',
    });
});

router.post('/participants/auth/signin', (req, res) => {
    res.status(200).json({
        message: 'signin',
    });
});
router.post('/participants/auth/signup', (req, res) => {
    res.status(200).json({
        message: 'signup',
    });
});

module.exports = router; //this command is to make this router can be accessible by app.js