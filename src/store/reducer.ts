import { combineReducers } from "redux";
import { recipeCardsReducer } from "./recipeCards/recucer";

const rootReducer = combineReducers({
   recipeCards: recipeCardsReducer
})

export default rootReducer;