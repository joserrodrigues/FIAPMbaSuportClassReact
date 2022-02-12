const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const storeProductsSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        required: false
    },
    stores: [{
        name:{
            type: String,
            required: true
        },
        address:{
            type: String,
            required: true
        },
        latitude:{
            type: Number,
            required: true
        },
        longitude:{
            type: Number,
            required: true
        }

    }]
}, { timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } });

module.exports = mongoose.model('StoreProducts', storeProductsSchema);