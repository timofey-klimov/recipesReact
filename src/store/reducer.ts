import { combineReducers } from "redux";
import { recipeCardsReducer } from "./recipeCards/recucer";
import searchReducer from './search/search.slice';

const rootReducer = combineReducers({
   recipeCards: recipeCardsReducer,
   search: searchReducer
})

export default rootReducer;