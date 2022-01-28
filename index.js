require('dotenv').config();
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');

const manageBooksRoutes = require('./routes/managePersons')
const testRoutes = require('./routes/test')

const app = express();

app.use(express.urlencoded({ extended: true })) // x-www-form-urlencoded
app.use(express.json())// json
app.use(cors())

app.use('/persons', manageBooksRoutes);
app.use('/', testRoutes);

console.log("Loading");
console.log(process.env.MONGO_URL);
console.log(process.env.PORT);
console.log(process.env.DATABASE_URL);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
});

// mongoose.connect(process.env.MONGO_URL,
// { useNewUrlParser: true, useUnifiedTopology: true })
// .then(result => {
//     app.listen(80);
// })
// .catch(err => {
//     console.log(err);
// })