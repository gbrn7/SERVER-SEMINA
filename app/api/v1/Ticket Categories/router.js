const express = require('express');
const router = express();

router.get('/talents', (req, res) => {
    res.status(200).json({
        message: 'get all talents',
    });
});

router.post('/talents', (req, res) => {
    res.status(200).json({
        message: 'create talents',
    });
});

router.get('/talents/:id', (req, res) => {
    res.status(200).json({
        message: "get one talents by id"
    });
});

router.put('/talents/:id', (req, res) => {
    res.status(200).json({
        message: 'update talents',
    });
});

router.delete('/talents/:id', (req, res) => {
    res.status(200).json({
        message: 'delete talents',
    });
});

module.exports = router; //this command is to make this router can be accessible by app.js