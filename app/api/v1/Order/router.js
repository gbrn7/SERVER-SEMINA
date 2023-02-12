const express = require('express');
const router = express();

router.get('/orders', (req, res) => {
    res.status(200).json({
        message: 'get all orders',
    });
});


router.get('/orders/:id', (req, res) => {
    res.status(200).json({
        message: "get one orders by id"
    });
});


module.exports = router; //this command is to make this router can be accessible by app.js