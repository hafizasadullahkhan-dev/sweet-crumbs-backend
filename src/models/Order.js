const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [
        {
            id: Number,
            name: String,
            price: Number,
            qty: Number,
            subtotal: Number
        }
    ],
    total: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);