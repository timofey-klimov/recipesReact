import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginationResponse } from "../../../core/api/respose.model";
import { IRecipeCard } from "../../../models/recipes/recipeCard.model";
import { fetchRecipeCardsThunk, initFetchRecipeCardsThunk } from "./getRecipeCards.thunk";

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
                  data: [...state.pageData.data, ...action.payload.data],
                  totalPages: action.payload.totalPages
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
         .addCase(initFetchRecipeCardsThunk.pending, (state, action) => ({
            ...state,
            isLoading: true,
            error: null,
            pageData: null,
            page: 1
         }))
         .addCase(initFetchRecipeCardsThunk.fulfilled, (state, action) => ({
            ...state,
            isLoading: false,
            error: null,
            page: 1,
            pageData: action.payload
         }))
         .addCase(initFetchRecipeCardsThunk.rejected, (state, action) => ({
            ...state,
            isLoading: false,
            error: action.payload!,
            pageData: null
         }))
   }
})

export default recipeCardsSlice.reducer;

export const {changePage} = recipeCardsSlice.actions; 