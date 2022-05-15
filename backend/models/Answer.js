const mongoose = require('mongoose');

const Joi = require('joi');

const AnswerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    },
    answerBody: {
        type: String,
        required: true,
        maxlength: 1000
    },
    votes: {
        type: Number,
        default: 0
    }

},
    { timestamps: true }
)

const Answer = mongoose.model("Answer", AnswerSchema);

const validateAnswer = (answer) => {
    const schema = Joi.object({
        user: Joi.objectId(),
        question: Joi.objectId().required(),
        answerBody: Joi.string().required(),
        votes: Joi.number()
    })

    const validation = schema.validate(answer);
    return validation;
}

module.exports = Answer
exports.validate = validateAnswer