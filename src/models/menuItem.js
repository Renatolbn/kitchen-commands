import { Schema, model } from "mongoose";

const menuItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  available: {
    type: Boolean,
    default: true
  },
  imageUrl: {
    type: String
  }
}, { timestamps: true });

export default model('MenuItem', menuItemSchema);