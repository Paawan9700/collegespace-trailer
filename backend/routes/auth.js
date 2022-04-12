const express = require('express');
// taking out user modal from /modals/User.js
const User = require('../models/User');

// for validation
const { body, validationResult } = require('express-validator');
const router = express.Router();

// for password hashing
const bcrypt = require('bcryptjs')

var jwt = require('jsonwebtoken');
// used to sign the web token
const JWT_SECRET = "paawanisagoodb$oy";

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

        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(req.body.password, salt);
        // creating a new user
        let newuser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPassword
        })

        const data = {
            user: {
                id: newuser.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);

        res.send({ authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})

// authenticating a user -> POST method -> "/api/auth/login" -> login is not required
router.post('/login', [
    body('email', 'Please Enter a valid email').isEmail(),
    body('password', 'password cnanot be blank').exists()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    // destructing email and password from req.body;
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email });

        // if user is not found means invalid user is there
        if (!user) {
            return res.status(400).send({ error: "please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).send( {error: "Please try to login with correct credentials"} );
        }

        const data = {
            user: {
                id: user.id,
            }
        }

        // { error: 'please authenticate using a valid token' }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json( authToken);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }

})
module.exports = router;