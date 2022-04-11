const express = require('express');
// taking out user modal from /modals/User.js
const User = require('../models/User');

const router = express.Router();

//everything is handled using router

// creating a user -> POST method -> authentication is not required 
router.post('/', (req, res) => {
    
    const user = User(req.body);
    user.save();
    res.send(req.body);
})


module.exports = router;