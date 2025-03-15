// Database Connection

require('dotenv').config();
const mongoose = require('mongoose');

if(process.env.NODE_ENV !== 'test'){ // Only connect to DB in non-test environment

    mongoose.connect(process.env.MONGO_URI,{
        dbName: "FitCheck+"
    }).then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.log(err);
    });

}



module.exports = mongoose;