import { IRecipeCard } from "../../models/recipes/recipeCard.model"
import { getPageAsync, postAsync } from "./api.core";
import { IApiResponse, PaginationResponse } from "./respose.model";

export async function getRecipeCardsAsync(): Promise<PaginationResponse<IRecipeCard>> {
  return await getPageAsync('recipe-cards/pages');
}

export async function createRecipeCardAsync(request: {
  title: string,
  mealType: string,
  remark: string | null,
  file: File
}): Promise<IApiResponse<IRecipeCard>> {
  const formData = new FormData();
  formData.append('title', request.title);
  if (request.remark) {
    formData.append('remark', request.remark)
  }
  formData.append('mealType', request.mealType);
  formData.append('file', request.file);
  return await postAsync('recipe-cards/create', formData)
}