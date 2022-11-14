import { ICreateIngredientsRequest } from "../../models/recipes/createIngredients.model";
import { postAsync } from "./api.core";
import { IApiResponse } from "./respose.model";

export async function createIngredientsAsync(request:ICreateIngredientsRequest): Promise<IApiResponse<void>> {
   return await postAsync(`ingredients/create/${request.id}`, {
      ingredients: request.ingredients
   });
}