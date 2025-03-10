import { Router, Request, Response, NextFunction } from "express";
import { imagesUpload } from "../multer";
import auth, { RequestWithUser } from "../middleware/auth";
import permit from "../middleware/permit";
import Product from "../models/Product";
import { ReviewInfo, newCocktailData } from "../types";
import mongoose from "mongoose";
import Review from "../models/Review";

const productRouter = Router(); 

productRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await Product.find({ isPublished: true });

    return res.send(results);
  } catch (e) {
    next(e);
  }
});

productRouter.get('/all-products',
  auth,
  permit("admin"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const results = await Product.find();

      return res.send(results);
    } catch {
      return null;
    }
  }
);

productRouter.get('/user-products', 
auth, 
async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const results = await Product.find({ user: req.user?._id });

    return res.send(results);
  } catch (e) {

    next(e);
  }
});

productRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = req.params.id;

      const result = await Product.findById(productId);

      const reviews = await Review.find({ productID: productId })

      let totalRating = 0;
      reviews.forEach((review) => {
        totalRating += review.rate;
      });

      const averageRating =
        reviews.length > 0 ? totalRating / reviews.length : 0;

      const reviewInfo: ReviewInfo = {
        averageRating: averageRating,
        reviewsCount: reviews.length 
      }

      return res.send({cocktail: result, reviews: reviewInfo});
    } catch (e) {
      next(e);
    }
  }
);

productRouter.post('/', imagesUpload.single('image'), 
auth,
async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const {title, recipe, ingredients} = req.body;
  const cocktailImage = req.file;
  const user = req.user;

  if (!cocktailImage || !user) {
    return res.status(400).send({ error: 'product fields missing' });
  }

  try {
    const newCocktailItem: newCocktailData = {
      user: user._id,
      title: title,
      recipe: recipe,
      image: cocktailImage.filename,
      ingredients: ingredients,
    };

    const cocktail = new Product(newCocktailItem);
    await cocktail.save();

    return res.status(201).send({ message: "product created!", cocktail });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    next(e);
  }
});

productRouter.patch('/:id/togglePublished', 
auth, 
permit('admin'), 
async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }

    product.isPublished = !product.isPublished;
    await product.save();

    return res.send({ message: 'Product published!', product });
  } catch (e) {
    next(e)
  }
});

productRouter.delete('/:id', 
auth, 
permit('admin'),
async (req: Request, res: Response, next:NextFunction) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).send({ error: "Product not found or already deleted." });
    }

    return res.send({ message: "success", deletedProduct });
  } catch (e) {
    next(e);
  }
});

export default productRouter;
