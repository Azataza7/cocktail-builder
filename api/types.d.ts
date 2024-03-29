import { ObjectId } from "mongoose";

export interface UserFields {
  _id: string;
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string;
  googleID?: string;
}

export interface newUserData {
  email: string;
  password: string;
  displayName: string;
  avatar: string;
}

export interface Ingredient {
  name: string;
  amount: string;
}

export interface CocktailFields {
  _id: string;
  user: string;
  title: string;
  image: string;
  recipe: string;
  isPublished: boolean;
  ingredients: Ingredient[]
}

export interface newCocktailData {
  user: string;
  title: string;
  image: string;
  recipe: string;
  ingredients: Ingredient[];
}
