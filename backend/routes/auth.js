const express = require('express');

const router = express.Router();

//everything is handled using router
router.get('/', (req, res) => {
    res.send("paawan singal");
})

module.exports = router;