const connectToMongo = require('./db');
const express = require('express')
const app = express()
const port = 3000;


connectToMongo();
app.use('/api/auth', require('./routes/auth'));
// app.use('/api/auth', require('./routes/'))

// listening to local host on PORT:3000
app.listen(port, () => {
  console.log(`CollegeSpace backend listening on port ${port}`)
})
