require('dotenv').config();
const mongoose = require('mongoose');
const PersonsSeeder = require('./seeders/PersonsSeeder')
const ToysSeeder = require('./seeders/ToysSeeder')

mongoose.connect(process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async (result) => {
    console.log("Running");

    await PersonsSeeder.remove();
    await PersonsSeeder.run();
    await ToysSeeder.remove();
    await ToysSeeder.run();
    process.exit();
  })
  .catch(err => {
    console.log(err);
  })


