const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true, 
        maxlength : 50
    }, 
    email : {
        type : String, 
        required : true, 
        unique : true
    }, 
    password : {
        type : String, 
        required : true,
        maxlength : 80
    }, 
    Date : {
        type : Date, 
        default : Date.now
    }
})

const User =  mongoose.model('User', UserSchema);

// todo -> validation to be done (using express validator it is done in auth.js)
module.exports = User;