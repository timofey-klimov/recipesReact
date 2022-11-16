import { ICookingStage } from "./cookingStage.model";
import { IIngredient } from "./ingredient.model";
import { IRecipeCard } from "./recipeCard.model";

export interface IRecipeDetails {
   recipeCard: IRecipeCard,
   remark: string | null,
   ingredients: IIngredient[],
   stages: ICookingStage[]
}