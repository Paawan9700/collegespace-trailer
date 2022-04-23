const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        maxlength: 400
    },
    tag: {
        type: String,
        required: true,
        maxlength: 50
    },
    Date: {
        type: Date,
        default: Date.now
    }
})

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;