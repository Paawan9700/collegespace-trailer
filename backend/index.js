const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000;

// middleware to use or to send json to the server
app.use(express.json());
app.use(cors())

connectToMongo();
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/users'));
app.use('/api/event', require('./routes/events'));



// listening to local host on PORT:3000
app.listen(port, () => {
  console.log(`CollegeSpace backend listening on port ${port}`)
})

// Testing