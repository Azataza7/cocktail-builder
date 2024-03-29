import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { Cocktail, User} from "../../types";


export const getCocktails = createAsyncThunk<Cocktail[], User | null>(
  'cocktails', async (user) => {
    if (!user || user.role === 'user') {
      const response = await axiosApi.get('/product');
      
      return response.data;
    }

    const isAdmin = Boolean(user.role === 'admin');

    const route = isAdmin ? "/product/all-products" : "/product";

    const response = await axiosApi.get<Cocktail[]>(route, 
      {headers: {Authorization: user.token}});

    return response.data;
  }
);

export const togglePublishedItem = createAsyncThunk<void, {id: string, token: string}>(
  'cocktail/togglePublished', async({id, token}) => {
    await axiosApi.patch(`product/${id}/togglePublished`, {}, 
    { headers: { Authorization: token } })
  }
)

