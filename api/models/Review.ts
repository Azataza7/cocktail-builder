import mongoose, { Schema, Types } from "mongoose";
import User from "./User";

const ReviewSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => await User.findById(value),
      message: "user not found",
    },
  },
  rate: {
    type: Number,
    required: true,
  },
});

const Review = mongoose.model('review', ReviewSchema);

export default Review;