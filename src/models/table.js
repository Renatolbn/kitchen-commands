import { Schema, model } from "mongoose";

const TABLE_STATUS = ["free", "busy", "requesting_bill"];

const tableSchema = new Schema(
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

export default model("Table", tableSchema);
