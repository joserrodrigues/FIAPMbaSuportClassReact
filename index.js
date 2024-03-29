require('dotenv').config();
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');

const swagger = require('./Swagger/Swagger')

const manageBooksRoutes = require('./Routes/managePersons')
const manageSimplePersonRoutes = require("./Routes/manageSimplePersons");
const authRoutes = require('./Routes/manageAuthPersons');
const nextRoutes = require('./Routes/manageNext');
const storeProductsRoutes = require('./Routes/manageStoreProducts');
const manageToysRoutes = require('./Routes/manageToys');
const manageChallengeSAP = require("./Routes/manageChallengeSAP");
const testRoutes = require('./Routes/test')

const app = express();

app.use(express.urlencoded({ extended: true, limit: '50mb' })) // x-www-form-urlencoded
app.use(express.json({ limit: '50mb' }))// json
app.use(cors())

swagger.mountSwagger(app);

app.use('/persons', manageBooksRoutes);
app.use("/simplePersons", manageSimplePersonRoutes);
app.use('/authPersons', authRoutes);
app.use('/api', nextRoutes);
app.use('/storeProducts', storeProductsRoutes);
app.use('/toys', manageToysRoutes);
app.use("/challengeSap", manageChallengeSAP);
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