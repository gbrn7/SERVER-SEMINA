const express = require('express');
const router = express();

router.get('/tickets-categories', (req, res) => {
    res.status(200).json({
        message: 'get all tickets-categories',
    });
});

router.post('/tickets-categories', (req, res) => {
    res.status(200).json({
        message: 'create tickets-categories',
    });
});

router.get('/tickets-categories/:id', (req, res) => {
    res.status(200).json({
        message: "get one tickets-categories by id"
    });
});

router.put('/tickets-categories/:id', (req, res) => {
    res.status(200).json({
        message: 'update tickets-categories',
    });
});

router.delete('/tickets-categories/:id', (req, res) => {
    res.status(200).json({
        message: 'delete tickets-categories',
    });
});

module.exports = router; //this command is to make this router can be accessible by app.js