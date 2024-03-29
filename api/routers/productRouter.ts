import { Router, Request, Response, NextFunction } from "express";
import { imagesUpload } from "../multer";
import auth, { RequestWithUser } from "../middleware/auth";
import permit from "../middleware/permit";
import Product from "../models/Product";
import { newCocktailData } from "../types";
import mongoose from "mongoose";

const productRouter = Router(); 

productRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await Product.find({isPublished: true});

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
    const results = await Product.find({user: req.user?._id});

    return res.send(results);
  } catch (e) {

    next(e);
  }
});

productRouter.post('/', imagesUpload.single('image'), 
auth,
async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const {title, recipe, ingredients} = req.body;
  const cocktailImage = req.file;
  const user = req.user;

  if (!cocktailImage || !user) {
    return res.status(400).send({error: 'product fields missing'});
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
      return res.status(404).send({error: 'Product not found'});
    }

    product.isPublished = !product.isPublished;
    await product.save();

    return res.send({message: 'Product published!', product});
  } catch (e) {
    next(e)
  }
})

export default productRouter;
