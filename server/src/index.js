require('./config/db');
const express = require('express');
const cors = require('cors');
const app = express()
const port = 3000
const routes = require('./routes');

app.use(cors());
app.use(express.json());

app.use(routes);

if(process.env.NODE_ENV !== 'test'){ // Only connect to DB in non-test environment

  app.listen(port, () => {
    console.log(`FitCheck+ Server listening on port ${port}`)
  })

}

module.exports = app;
