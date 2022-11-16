import { createSlice } from "@reduxjs/toolkit"
import { IRecipeDetails } from "../../../models/recipes/recipeDetails.model"
import { getRecipeDetailsThunk } from "./recipeDetails.thunk"

type RecipeCardDetailsState = {
   details: IRecipeDetails | null,
   isLoading: boolean,
   error: boolean
}

const initialState: RecipeCardDetailsState = {
   details: null,
   isLoading: false,
   error: false
}

const recipeCardDetails = createSlice({
   name: 'recipeCards/details',
   initialState: initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getRecipeDetailsThunk.pending, (state) => ({
            ...state,
            isLoading: true,
            details: null,
            error: false
         }))
         .addCase(getRecipeDetailsThunk.fulfilled, (state, action) => ({
            ...state,
            details: action.payload,
            isLoading: false,
            error: false
         }))
         .addCase(getRecipeDetailsThunk.rejected, (state) => ({
            ...state,
            details: null,
            isLoading: false,
            error: true
         }))
   }
})

export default recipeCardDetails.reducer