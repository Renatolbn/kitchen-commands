import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 4,
    },
    role: {
      type: String,
      enum: ["admin", "waiter", "kitchen"],
      default: "waiter",
    },
  },
  { timestamps: true },
);

export default model("User", userSchema);
