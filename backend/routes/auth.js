const express = require('express');
// taking out user modal from /modals/User.js
const User = require('../models/User');

const _ = require('lodash');

// for validation
const { body, validationResult } = require('express-validator');
const router = express.Router();

// for password hashing
const bcrypt = require('bcryptjs')

var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

// used to sign the web token
const JWT_SECRET = "paawanisagoodb$oy";

//everything is handled using router
// Route 1 : creating a user -> POST method -> "/api/auth/signup" -> login is not required 
router.post('/signup', [
    body('email', 'Please Enter a valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Min Password should be of 5 length').isLength({ min: 5 }),
], async (req, res) => {

    let success = false;
    // if there are errors then return a bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
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
        const { name, email, password } = req.body
        let newuser = await User.create({
            name: name,
            email: email,
            password: securedPassword
        })

        const data = {
            user: {
                id: newuser.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.send({ success, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})

// Route 2 : authenticating a user -> POST method -> "/api/auth/login" -> login is not required
router.post('/login', [
    body('email', 'Please Enter a valid email').isEmail(),
    body('password', 'password cnanot be blank').exists()
], async (req, res) => {

    let success = false;

    const errors = validationResult(req);
    // if there are errors return bad request and the errors as well
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    // destructing email and password from req.body;
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email });

        // if user is not found means invalid user is there (return bad request)
        if (!user) {
            success = false;
            return res.status(400).send({ success, error: "please try to login with correct credentials" });
        }

        // used to compare password entered by the user and password already present there in the database for that particular user
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).send({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id,
            }
        }

        // { error: 'please authenticate using a valid token' }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }

})
module.exports = router;