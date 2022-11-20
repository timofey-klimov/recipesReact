import { IRecipeCard } from "../../models/recipes/recipeCard.model"
import { IRecipeDetails } from "../../models/recipes/recipeDetails.model";
import { getAsync, getPageAsync, postAsync } from "./api.core";
import { IApiResponse, PaginationResponse } from "./respose.model";

export async function getRecipeCardsAsync(page: number): Promise<PaginationResponse<IRecipeCard>> {
  return await getPageAsync('recipe-cards/pages', { pageNumber: page });
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

export async function getRecipeDetailsAsync(id: number): Promise<IApiResponse<IRecipeDetails>> {
  return await getAsync(`recipe-cards/details/${id}`);
}

export async function getRecipesBySearchQueryAsync(value: string): Promise<IApiResponse<IRecipeCard[]>> {
  return await getAsync(`recipe-cards/search`, { search: value })
}