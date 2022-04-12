const express = require('express');
// taking out user modal from /modals/User.js
const User = require('../models/User');

// for validation
const { body, validationResult } = require('express-validator');
const router = express.Router();

//everything is handled using router

// creating a user -> POST method -> "/api/auth/signup" -> login is not required 
router.post('/signup', [
    body('email', 'Please Enter a valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Min Password should be of 5 length').isLength({ min: 5 }),
], async (req, res) => {

    // if there are errors then return a bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // check whether a user with this email already exits or not
        let user = await User.findOne({ email: req.body.email })

        // if user is existing
        if (user) {
            return res.status(400).json("sorry, a user with this email already exists");
        }

        // creating a new user
        let newuser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        res.send({ newuser });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})


module.exports = router;