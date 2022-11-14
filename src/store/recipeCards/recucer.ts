import { combineReducers } from "redux";
import cardsReducer from './getRecipeCards/getRecipeCards.slice';
import createCardReducer from './createRecipe/createRecipeCard.slice';

export const recipeCardsReducer = combineReducers({
   cards: cardsReducer,
   createCard: createCardReducer
})