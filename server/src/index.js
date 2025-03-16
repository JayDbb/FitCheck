require('./config/db');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express()
const port = 3000
const routes = require('./routes');


app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase JSON limit
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Increase URL-encoded form limit

app.use(helmet());
app.use(morgan('dev'));

// Increase payload size limit
app.use(routes);

if(process.env.NODE_ENV !== 'test'){ // Only connect to DB in non-test environment

  app.listen(port, () => {
    console.log(`FitCheck+ Server listening on port ${port}`)
  })

}

module.exports = app;
