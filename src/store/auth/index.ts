import { combineReducers } from "redux";
import signUpReducer from './signUp/signUp.slice';
import signInReducer from './signIn/signIn.slice';

const authReducer = combineReducers({
   signUp: signUpReducer,
   signIn: signInReducer
})

export default authReducer;