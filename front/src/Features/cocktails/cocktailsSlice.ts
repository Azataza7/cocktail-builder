import { createSlice } from "@reduxjs/toolkit";
import { getCocktails, togglePublishedItem } from "./cocktailsThunks";
import { Cocktail } from "../../types";
import { RootState } from "../../app/store";

interface cocktailState {
  cocktails: Cocktail[];

  cocktailsLoading: boolean;
  cocktailPublishedLoading: boolean;
}

const initialState: cocktailState = {
  cocktails: [],

  cocktailsLoading: false,
  cocktailPublishedLoading: false,
};

export const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCocktails.pending,  (state: cocktailState) => {
      state.cocktailsLoading = true;
    });
    builder.addCase(getCocktails.fulfilled, (state: cocktailState, {payload: cocktails}) => {
      state.cocktails = cocktails;
      state.cocktailsLoading = false;

    });
    builder.addCase(getCocktails.rejected, (state: cocktailState) => {
      state.cocktailsLoading = false;
    });

    builder.addCase(togglePublishedItem.pending, (state: cocktailState) => {
      state.cocktailPublishedLoading = true;
    });
    builder.addCase(togglePublishedItem.fulfilled, (state: cocktailState) => {
        state.cocktailPublishedLoading = false;
      }
    );
    builder.addCase(togglePublishedItem.rejected, (state: cocktailState) => {
      state.cocktailPublishedLoading = false;
    });
  },
})

export const cocktailReducer = cocktailsSlice.reducer;

export const selectCocktails = (state: RootState) => state.cocktail.cocktails;

export const selectCocktailLoading = (state: RootState) => state.cocktail.cocktailsLoading;
export const selectCocktailPublishedLoading = (state: RootState) => state.cocktail.cocktailPublishedLoading;