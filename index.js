require('dotenv').config();
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');

const manageBooksRoutes = require('./Routes/managePersons')
const authRoutes = require('./Routes/manageAuthPersons');
const testRoutes = require('./Routes/test')

const app = express();

app.use(express.urlencoded({ extended: true })) // x-www-form-urlencoded
app.use(express.json())// json
app.use(cors())

app.use('/persons', manageBooksRoutes);
app.use('/authPersons', authRoutes);
app.use('/', testRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose.connect(process.env.MONGO_URL,
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(result => {
    app.listen(process.env.PORT);
})
.catch(err => {
    console.log(err);
})