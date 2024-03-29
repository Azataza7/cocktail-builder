import { Router, Response, NextFunction } from "express";
import Review from "../models/Review";
import auth, { RequestWithUser } from "../middleware/auth";
import { UserReview } from "../types";
import mongoose from "mongoose";

const reviewRouter = Router();

reviewRouter.get('/', async (req, res, next) => {
  const results = await Review.find().populate('userID', '_id email displayName avatar role');

  return res.send(results);
});

reviewRouter.post('/', auth, async(req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).send({ error: "user is missing" });
    }

    const existingReview = await Review.findOneAndUpdate(
      { userID: user._id, productID: req.body.productID },
      { rate: req.body.rate }
    );

    if (!existingReview) {
      const newUserReview: UserReview = {
        userID: user._id,
        productID: req.body.productID,
        rate: req.body.rate,
      };

      const review = new Review(newUserReview);
      review.save();

      return res.status(201).send({ message: "review created!", review });
    }

    return res.status(200).send({ message: "Review updated!" });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    next(e);
  }
});

export default reviewRouter;