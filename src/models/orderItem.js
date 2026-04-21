import { Schema, model } from 'mongoose';

const ORDER_ITEM_STATUS = ['pending', 'in_progress', 'ready', 'delivered', 'cancelled'];

const orderItemSchema = new Schema({
    menuItem: {
        type: Schema.Types.ObjectId,
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

export default model('OrderItem', orderItemSchema);