const express = require('express');
const router = express.Router();

const { Question, validate } = require('../models/Question');

// fetchuser middle ware
const fetchuser = require('../middleware/fetchuser');

// route 1 -> fetch questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find().sort("createdAt");
        questions.reverse();

        res.send(questions);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})

// route 2 -> add questions 
router.post('/', fetchuser, async (req, res) => {

    // validating question 
    const error = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        // destructuring things from req.body, that what a user has send
        const { title, questionBody, votes, tag } = req.body;

        const newQuestion = new Question({
            user: req.user._id,
            title: title,
            questionBody: questionBody,
            votes: votes,
            tag: tag
        })

        const savedQuestion = await newQuestion.save();
        res.send(savedQuestion);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured");
    }
})

// route 3 -> just to sort the questions according to the tags (/disscussionforum/:subject)
router.put('/update/:id', fetchuser, async (req, res) => {

    const error = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // destructuring
    const { title, questionBody, votes, tag } = req.body
    
})
