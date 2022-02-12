const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: false
    },
    token: {
        type: String,
        required: false
    },    
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    favProducts: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'StoreProducts'
    }]
}, { timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } });

module.exports = mongoose.model('StoreUser', userSchema);