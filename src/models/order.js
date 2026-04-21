import { Schema, model } from "mongoose";

const ORDER_STATUS = ["open", "in_progress", "ready", "closed", "cancelled"];

const orderSchema = new Schema({
  table: {
    type: Schema.Types.ObjectId,
    ref: "Table",
    required: true,
  },
  waiter: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "OrderItem",
    },
  ],
  status: {
    type: String,
    enum: ORDER_STATUS,
    default: "open",
  },
  totalAmount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default model('Order', orderSchema);