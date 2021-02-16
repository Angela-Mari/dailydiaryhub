//import basics
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

//the server and port
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//not good coding practice probs
const uri = process.env.MONGODB_URI;
const local = process.env.REACT_APP_ATLAS_URI
mongoose.connect(uri || local, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true } 
    );
const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log("MongoDB connected")
})


const quotesRouter = require('./routes/quotes.js');
const usersRouter = require('./routes/users.js');
const entriesRouter = require('./routes/entries.js');

app.use('/quotes', quotesRouter);
app.use('/users', usersRouter);
app.use('/entries', entriesRouter);

// Heroku
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}


//start the server
app.listen(port, ()=>{
    console.log(`server is running on port: ${port}`)
})
