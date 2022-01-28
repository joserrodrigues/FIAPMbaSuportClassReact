require('dotenv').config();
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');

const manageBooksRoutes = require('./routes/managePersons')

const app = express();

app.use(express.urlencoded({ extended: true })) // x-www-form-urlencoded
app.use(express.json())// json
app.use(cors())

app.use('/persons', manageBooksRoutes);


mongoose.connect(process.env.MONGO_URL,
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(result => {
    app.listen(80);
})
.catch(err => {
    console.log(err);
})