const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');

router.get('/events', index);

router.post('/events', create);

router.get('/events/:id', find);

router.put('/events/:id', update);

router.delete('/events/:id', destroy);

module.exports = router; //this command is to make this router can be accessible by app.js