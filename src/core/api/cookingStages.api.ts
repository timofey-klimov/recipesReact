import { ICreateStagesRequest } from "../../models/recipes/createStages.model";
import { postAsync } from "./api.core";

export async function createStageAsync(request: ICreateStagesRequest) {
   const recipeId = request.id;
   const formData = new FormData();
   if (request.image) {
      formData.append('image', request.image);
   }
   formData.append('description', request.description)
   return await postAsync(`stages/create/${recipeId}`, formData)
}