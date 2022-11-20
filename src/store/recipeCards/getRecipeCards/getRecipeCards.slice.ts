import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginationResponse } from "../../../core/api/respose.model";
import { IRecipeCard } from "../../../models/recipes/recipeCard.model";
import { fetchRecipeCardsThunk } from "./getRecipeCards.thunk";

type RecipeCardsState = {
   pageData: PaginationResponse<IRecipeCard> | null,
   isLoading: boolean,
   error: string | null,
   page: number
}

const initialState: RecipeCardsState = {
   pageData: null,
   isLoading: false,
   error: null,
   page: 1
}

const recipeCardsSlice = createSlice({
   name: 'recipeCards/get',
   initialState,
   reducers: {
      changePage(state, action: PayloadAction<number>) {
         return {
            ...state,
            page: action.payload
         }
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchRecipeCardsThunk.pending, (state) => ({
            ...state,
            isLoading: true,
         }))
         .addCase(fetchRecipeCardsThunk.fulfilled, (state, action) => {
            
            if (state.pageData) {
               const pageData = {
                  ...state.pageData,
                  data: [...state.pageData.data, ...action.payload.data]
               } as PaginationResponse<IRecipeCard>;

               return {
                  ...state,
                  pageData: pageData,
                  isLoading: false,
                  error: null
               }
               
            }
           return { 
               ...state,
               pageData: action.payload,
               isLoading: false,
               error: null
           }
         })
         .addCase(fetchRecipeCardsThunk.rejected, (state, action) => ({
            ...state,
            isLoading: false,
            error: action.payload!
         }))
   }
})

export default recipeCardsSlice.reducer;

export const {changePage} = recipeCardsSlice.actions; 