const express = require('express');
const router = express();

router.get('/events', (req, res) => {
    res.status(200).json({
        message: 'get all events',
    });
});

router.post('/events', (req, res) => {
    res.status(200).json({
        message: 'create events',
    });
});

router.get('/events/:id', (req, res) => {
    res.status(200).json({
        message: "get one events by id"
    });
});

router.put('/events/:id', (req, res) => {
    res.status(200).json({
        message: 'update events',
    });
});

router.delete('/events/:id', (req, res) => {
    res.status(200).json({
        message: 'delete events',
    });
});

module.exports = router; //this command is to make this router can be accessible by app.js