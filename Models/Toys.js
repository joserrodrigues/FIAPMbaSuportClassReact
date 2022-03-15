const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const toysSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    mainImage: {
        type: String,
        require: false
    },
    detailImage1: {
        type: String,
        require: false
    },
    detailImage2: {
        type: String,
        require: false
    },
    conditionType: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    receiveDate:{
        type: String,
        required: true
    },
    receiveResponsable:{
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },    
}, { timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } });

module.exports = mongoose.model('Toys', toysSchema);