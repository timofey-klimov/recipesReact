import { combineReducers } from "redux";
import recipeCardsReducer from "./recipeCards/recucer";
import searchReducer from './search/search.slice';
import authReducer from './auth/index';

const rootReducer = combineReducers({
   recipeCards: recipeCardsReducer,
   search: searchReducer,
   auth: authReducer
})

export default rootReducer;