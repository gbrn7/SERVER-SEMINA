const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');

router.get('/categories', index);


router.post('/categories', create);

router.get('/categories/:id', find);

router.put('/categories/:id', update);

router.delete('/categories/:id', destroy);

// router.delete('/categories/:id', (req, res) => {
//     res.status(200).json({
//         message: 'delete categories by id',
//     });
// });

module.exports = router; //this command is to make this router can be accessible by app.js