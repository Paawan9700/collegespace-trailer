// making a model for data where all information regarding a particular question is being saved 
const mongoose = require('mongoose');

// for backend validation
const Joi = require('joi');

// schema or blue print we made before doing any particular task
const QuestionSchema = new mongoose.Schema({
    user: {
        // reference is user just to define that this question is belonging to a particular user
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
        maxlength: 50,
        // to remove white space in between a string we use trim 
        trim: true
    },
    questionBody: {
        type: String,
        required: true,
        maxlength: 500
    },
    tags: {
        type: Array
    },
    votes: {
        type: Number,
        default: 0
    }
},
    { timestamps: true }
);

// model is made using QuestionSchema which we have made above
const Question = mongoose.model("Question", QuestionSchema);

// this is a validation function and (rather i can also use express-validator provided by the exprss as one of its package)
const validateQuestion = (question) => {
    const schema = Joi.object({
        user: Joi.objectId(),
        title: Joi.string().min(2).max(50).required(),
        questionBody: Joi.string().min(2).max(500).required(),
        votes: Joi.number(),
        tags: Joi.array()
    })

    const validation = schema.validate(question);
    return validation;
}
module.exports = Question;
exports.validate = validateQuestion;