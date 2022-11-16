import { combineReducers } from "redux";
import cardsReducer from './getRecipeCards/getRecipeCards.slice';
import createCardReducer from './createRecipe/createRecipeCard.slice';
import recipeDetailsReducer from './recipeDetails/recipeDetails.slice';

export const recipeCardsReducer = combineReducers({
   cards: cardsReducer,
   createCard: createCardReducer,
   recipeDetails: recipeDetailsReducer
})