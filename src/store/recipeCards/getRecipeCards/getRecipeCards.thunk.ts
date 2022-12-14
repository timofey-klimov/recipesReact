import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRecipeCardsAsync,createRecipeCardAsync } from "../../../core/api/recipeCards.api";
import { PaginationResponse } from "../../../core/api/respose.model";
import { IRecipeCard } from "../../../models/recipes/recipeCard.model";
import {toast} from 'react-toastify';


export const fetchRecipeCardsThunk = 
   createAsyncThunk<PaginationResponse<IRecipeCard>, {page: number, search: string | null}, {rejectValue: string}>(
      'recipeCards/fetch',
      async function(data, { rejectWithValue}) {
         const response = await getRecipeCardsAsync(data.page, data.search);
         if (!response.success) {
            toast.error('Произошла ошибка при получении рецептов');
            return rejectWithValue('Произошла ошибка при получении данных');
         }
         return response
   }
)

export const initFetchRecipeCardsThunk = createAsyncThunk<PaginationResponse<IRecipeCard>, string | null, {rejectValue: string}>(
   'recipeCards/init',
   async function(search, {rejectWithValue}) {
      const response = await getRecipeCardsAsync(1, search);
      if (!response.success) {
         toast.error('Произошла ошибка при получении рецептов');
         return rejectWithValue('Произошла ошибка при получении рецептов')
      }

      return response;
   }
)
