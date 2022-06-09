const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// used to sign the web token
const JWT_SECRET = "paawanisagoodb$oy";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        maxlength: 1024, 
        minlength : 3
    },
    Date: {
        type: Date,
        default: Date.now
    },

    isAdmin : Boolean,
})

// used to generate auth token using json web toke secret
UserSchema.methods.generateAuthToken = function(){
    const authToken = jwt.sign(
        {_id : this._id, isAdmin : this.isAdmin}, 
        JWT_SECRET,
    )

    return authToken;
}

const User = mongoose.model('User', UserSchema);
module.exports = User;