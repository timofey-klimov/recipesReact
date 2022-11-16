import { createAsyncThunk } from "@reduxjs/toolkit";
import { createStageAsync } from "../../../core/api/cookingStages.api";
import { createIngredientsAsync } from "../../../core/api/ingredients.api";
import { createRecipeCardAsync } from "../../../core/api/recipeCards.api";
import { ICreateRecipeRequest } from "../../../models/recipes/createRecipe.model";
import { toast } from 'react-toastify';

export const createRecipeCardThunk = createAsyncThunk<void, ICreateRecipeRequest, { rejectValue: string}>(
   'recipeCards/createCard',
   async function(createData, {rejectWithValue}) {

      const errorMessage = 'Произошла ошибка при создании рецепта';

      const createMessage = (code: number, message: string):string => {
         return code === 409 ? message : errorMessage;
      }

      const createCardResponse = await createRecipeCardAsync({
         title: createData.title,
         remark: createData.remark,
         file: createData.image,
         mealType: createData.mealType
      });

      if (!createCardResponse.success) {
         const {code,error} = createCardResponse;
         const message = createMessage(code!, error!);
         toast.error(message);
         return rejectWithValue(message);
      }

      const createIngredientsResponse = await createIngredientsAsync({
         id: createCardResponse.data!.id!,
         ingredients: createData.ingredients
      })

      if (!createIngredientsResponse.success) {
         const {code,error} = createIngredientsResponse;
         const message = createMessage(code!, error!);
         toast.error(message);
         return rejectWithValue(message);
      }

      for (let stage of createData.stages) {
         const response = await createStageAsync({
            id: createCardResponse.data!.id!,
            image: stage.image,
            description: stage.description
         })

         if (!response.success) {
            const {code,error} = response;
            const message = createMessage(code!, error!);
            toast.error(message);
            return rejectWithValue(message);
         }
      }
      toast.success('Рецепт создан');
   }
)
