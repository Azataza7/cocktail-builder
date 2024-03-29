import mongoose, { Schema, Types } from "mongoose";
import User from "./User";

const ProductSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => await User.findById(value),
      message: "user not found",
    },
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  recipe: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  ingredients: [
    {
      name: {
        type: String,
        required: true,
      },
      amount: {
        type: String,
        required: true,
      },
    },
  ],
});

const Product = mongoose.model('product', ProductSchema);

export default Product