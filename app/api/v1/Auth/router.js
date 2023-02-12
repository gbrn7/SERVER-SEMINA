const express = require('express');
const router = express();

router.post('/signin', (req, res) => {
    res.status(200).json({
        message: 'Signin',
    });
});


router.post('/cms/organizers', (req, res) => {
    res.status(200).json({
        message: "create admin / organizer"
    });
});


module.exports = router; //this command is to make this router can be accessible by app.js