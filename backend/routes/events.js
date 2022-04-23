const express = require('express');
const router = express.Router();

// fetchuser middle ware
const fetchuser = require('../middleware/fetchuser');
// for validation
const { body, validationResult } = require('express-validator');

// importing events model
const Event = require('../models/Event');


// Route 1 : fetching events from the database, route -> /api/event/fetchevents : login required 
router.get('/fetchevents', fetchuser, async (req, res) => {

    try {
        const events = await Event.find()
        res.json(events);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})


//Route 2 : adding events by the student in the database -> /api/event/addevent : login required
router.post('/addevent', fetchuser, [

    // firstly check for validation of the req send by the user to add that particular event
    body('title', 'Please Enter a valid title').isLength({ min: 3 }),
    body('description', 'Min description should be of 5 length').isLength({ min: 5 }),
], async (req, res) => {

    // if there are errors then return a bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, tag } = req.body;

        const newEvent = new Event({
            title: title,
            description: description,
            tag: tag
        })

        const savedEvent = await newEvent.save();
        res.send(savedEvent);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }

})
module.exports = router;