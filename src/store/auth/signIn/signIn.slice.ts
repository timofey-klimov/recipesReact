import { createSlice } from "@reduxjs/toolkit";
import { signInThunk } from "./signIn.thunk";

interface ISignInState {
   isLoading: boolean,
   error: string | null
}

const initialState: ISignInState = {
   isLoading: false,
   error: null
}

const signInSlice = createSlice({
   name: 'auth/signIn',
   initialState,
   reducers: {
      clearSignUpError(state) {
         return ({
            ...state,
            isLoading: false,
            error: null
         })
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(signInThunk.pending, (state, action) => ({
            ...state,
            isLoading: true,
            error: null
         }))
         .addCase(signInThunk.fulfilled, (state, action) => ({
            ...state,
            isLoading: false,
            error: null
         }))
         .addCase(signInThunk.rejected, (state, action) => ({
            ...state,
            isLoading: false,
            error: action.payload!
         }))
   }
})

export default signInSlice.reducer;
export const {clearSignUpError} = signInSlice.actions;