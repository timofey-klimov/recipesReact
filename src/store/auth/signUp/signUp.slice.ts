import { createSlice } from "@reduxjs/toolkit";
import { signUpThunk } from "./signUp.thunk";

interface ISignUpState {
   isLoading: boolean,
   isError: boolean | null
}

const initialState: ISignUpState = {
   isError: null,
   isLoading: false
}

const signUpSlice = createSlice({
   name: 'auth/signUp',
   initialState,
   reducers: {
      
   },
   extraReducers: (builder) => {
      builder
         .addCase(signUpThunk.pending, (state, action) => ({
            ...state,
            isError: null,
            isLoading: true
         }))
         .addCase(signUpThunk.fulfilled, (state, action) => ({
            ...state,
            isLoading: false,
            isError: null
         }))
         .addCase(signUpThunk.rejected, (state, action) => ({
            ...state,
            isLoading: false,
            isError: true
         }))
   }
})

export default signUpSlice.reducer