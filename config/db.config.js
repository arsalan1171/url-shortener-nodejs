// import mongoose package
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
// declare a Database string URI
const DB_URI = 'mongodb://127.0.0.1:27017/urlshortener'

// establishing a database connection
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection

// export the connection object
module.exports = connection


