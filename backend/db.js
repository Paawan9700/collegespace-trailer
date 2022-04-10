const mongoose = require('mongoose');

const mongooseURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectToMongo = () => {
    mongoose.connect(mongooseURI, () => {
        console.log("connected to mongoDB successfully");
    })
}

module.exports = connectToMongo;