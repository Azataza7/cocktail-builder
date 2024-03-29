import mongoose, { Schema, Types } from "mongoose";
import User from "./User";
import Product from "./Product";

const ReviewSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => await User.findById(value),
      message: "user not found",
    },
  },
  productID: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => await Product.findById(value),
      message: "product not found",
    },
  },
  rate: {
    type: Number,
    required: true,
  },
});

const Review = mongoose.model('review', ReviewSchema);

export default Review;