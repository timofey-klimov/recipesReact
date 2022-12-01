import { createSlice } from "@reduxjs/toolkit";
import { createRecipeCardThunk } from "./createRecipeCard.thunk";

type CreateRecipeCardState = {
   error?: string | null,
   isLoading: boolean,
   isCreating: boolean
}

const initialState: CreateRecipeCardState = {
   error: null,
   isLoading: false,
   isCreating: false
}


const createRecipeCardSlice = createSlice({
   name: 'recipeCard/create',
   initialState: initialState,
   reducers: {

   },
   extraReducers: (builder) => {
      builder
         .addCase(createRecipeCardThunk.pending, (state, action) => ({
            ...state,
            error: null,
            isLoading: true,
            isCreating: false
         }))
         .addCase(createRecipeCardThunk.fulfilled, (state) => ({
            ...state,
            error: null,
            isLoading: false,
            isCreating: true
         }))
         .addCase(createRecipeCardThunk.rejected, (state, action) => ({
            ...state,
            error: action.payload,
            isLoading: false,
            isCreating: false
         }))
   }
})

export default createRecipeCardSlice.reducer;