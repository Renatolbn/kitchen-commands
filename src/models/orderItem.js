const mongoose = require('mongoose');

const ORDER_ITEM_STATUS = ['pending', 'in_progress', 'ready', 'delivered', 'cancelled'];

const orderItemSchema = new mongoose.Schema({
    menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    note: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ORDER_ITEM_STATUS,
        default: 'pending'
    }
}, { timestamps:true });

module.exports = mongoose.model('OrderItem', orderItemSchema);