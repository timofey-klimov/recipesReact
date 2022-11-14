import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRecipeCardsAsync,createRecipeCardAsync } from "../../../core/api/recipeCards.api";
import { PaginationResponse } from "../../../core/api/respose.model";
import { IRecipeCard } from "../../../models/recipes/recipeCard.model";
import {toast} from 'react-toastify';


export const fetchRecipeCardsThunk = createAsyncThunk<PaginationResponse<IRecipeCard>, void, {rejectValue: string}>(
   'recipeCards/fetch',
   async function(_, { rejectWithValue}) {
      const response = await getRecipeCardsAsync();
      if (!response.success) {
         toast.error('Произошла ошибка при получении рецептов');
         return rejectWithValue('Произошла ошибка при получении данных');
      }
      return response
   }
)