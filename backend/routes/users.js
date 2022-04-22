const express = require('express');
// taking out user modal from /modals/User.js
const User = require('../models/User');

const router = express.Router();
const fetchuser = require('../middleware/fetchuser');

// Route 1 : getting a user having valid auth token -> get method -> "/api/auth/getuser" 
// authentication is required in this step.


router.get('/getuser', fetchuser, async (req, res) => {
    try {
        // user id to be fetched from auth token
        const userId = req.user.id;

        // auth token will help me to get the user id and i can get all information about the user except password
        const user = await User.findById(userId).select("-password");
        res.send(user);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})

module.exports = router;