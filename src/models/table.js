const mongoose = require("mongoose");

const TABLE_STATUS = ["free", "busy", "requesting_bill"];

const tableSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: TABLE_STATUS,
      default: "free",
    },
    capacity: {
      type: Number,
      default: 4,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Table", tableSchema);
