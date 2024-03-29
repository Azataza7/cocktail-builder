export interface User {
  _id: string;
  email: string;
  token: string;
  role: string;
  avatar: string;
  displayName: string;
  googleID: string | null;
}

export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
  avatar: File | null;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface GlobalError {
  error: string;
}

export interface CocktailIngredients {
  _id: string;
  name: string;
  amount: string;
}

export interface Cocktail {
  _id: string;
  user: string;
  title: string;
  image: string;
  recipe: string;
  isPublished: boolean;
  ingredients: CocktailIngredients[]
}