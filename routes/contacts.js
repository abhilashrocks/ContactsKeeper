const express = require('express');
const router = express.Router();

// @route  get api/contacts
// @desc  get all user contacts
// @access private

router.get('/', (req, res) => {
    res.send('get all user contacts')
});

// @route  post api/contacts
// @desc  add new contact
// @access private

router.post('/', (req, res) => {
    res.send('add new contact')
});

// @route  put api/contacts/:id
// @desc  update new contact
// @access private

router.put('/:id', (req, res) => {
    res.send('update new contact')
});

// @route  delete api/contacts/:id
// @desc  delete new contact
// @access private

router.delete('/:id', (req, res) => {
    res.send('delete new contact')
});



module.exports = router;