const connectToMongo = require('./db');
const express = require('express')
const app = express()
const port = 5000;

// middleware to use or to send json to the server
app.use(express.json());

connectToMongo();
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/users'));



// listening to local host on PORT:3000
app.listen(port, () => {
  console.log(`CollegeSpace backend listening on port ${port}`)
})
