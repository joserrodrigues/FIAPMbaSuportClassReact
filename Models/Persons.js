const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const personSchema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        required: false
    },
    address: {
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
    image: {
        type: String,
        required: true
    },    
}, { timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } });

module.exports = mongoose.model('Persons', personSchema);