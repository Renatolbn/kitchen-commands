const mongoose = require("mongoose");

const ORDER_STATUS = ["open", "in_progress", "ready", "closed", "cancelled"];

const orderSchema = new mongoose.Schema({
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    required: true,
  },
  waiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('Order', orderSchema);