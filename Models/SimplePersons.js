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
    jobTitle: {
        type: String,
        required: false
    },
    CPF: {
        type: String,
        required: true
    },    
    image: {
        type: String,
        required: true
    },    
}, { timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } });

module.exports = mongoose.model("SimplePersons", personSchema);