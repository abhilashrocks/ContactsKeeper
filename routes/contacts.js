const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');


// @route  get api/contacts
// @desc  get all user contacts
// @access private

router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts)
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: 'server error' });
    }
});

// @route  post api/contacts
// @desc  add new contact
// @access private

router.post('/', [auth, [
    check('name', 'name is requried').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, phone, type } = req.body;
    try {
        const newContact = new Contact({
            name, email, phone, type, user: req.user.id
        });
        const contact = await newContact.save();
        res.json(contact);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: 'server error' });
    }
});

// @route  put api/contacts/:id
// @desc  update new contact
// @access private

router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, type } = req.body;

    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authroised' });
        }

        contact = await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactFields },
            { new: true });

        res.json(contact);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: 'server error' });
    }
});

// @route  delete api/contacts/:id
// @desc  delete new contact
// @access private

router.delete('/:id', auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authroised' });
        }

        await Contact.findByIdAndRemove(req.params.id);

        res.json({ msg: 'contact removed' });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: 'server error' });
    }
});



module.exports = router;