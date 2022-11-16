import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getRecipeDetailsAsync } from "../../../core/api/recipeCards.api";
import { IRecipeDetails } from "../../../models/recipes/recipeDetails.model";

export const getRecipeDetailsThunk = createAsyncThunk<IRecipeDetails, number, {rejectValue: string}>(
   'recipeCards/details',
   async function(id: number, {rejectWithValue}) {
      const response = await getRecipeDetailsAsync(id);
      if (!response.success) {
         const message = 'Произошла ошибка при получении данных';
         toast.error(message);
         return rejectWithValue(message);
      }

      return response.data!;
   }
)