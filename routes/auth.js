const express = require('express');
const router = express.Router();

// @route  get api/auth
// @desc  get login user
// @access private

router.get('/', (req, res) => {
    res.send('get login user')
});

// @route  post api/auth
// @desc  auth user and get token
// @access public

router.post('/', (req, res) => {
    res.send('login user')
});


module.exports = router;