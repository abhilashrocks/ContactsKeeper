const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');


// @route  get api/auth
// @desc  get login user
// @access private

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('server error');
    }
});

// @route  post api/auth
// @desc  auth user and get token
// @access public

router.post('/', [
    check('email', 'please include a valid email').isEmail(),
    check('password', 'password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Crendentials' })
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Crendentials' })
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000

        }, (err, token) => {
            if (err) throw err;
            res.send({ token });
        })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('server error');
    }
});


module.exports = router;