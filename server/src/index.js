require('./config/db');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express()
const routes = require('./routes');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true })); 
app.use(helmet());
app.use(morgan('dev'));
app.use(routes);

if(process.env.NODE_ENV !== 'test'){ 
  app.listen(PORT, () => {
    console.log(`FitCheck+ Server listening on port ${PORT}`)
  })
}

module.exports = app;