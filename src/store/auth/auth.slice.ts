import { createSlice } from "@reduxjs/toolkit";
import { signUpThunk } from "./auth.thunk";

interface IAuthState {
   isLoading: boolean,
   isError: boolean | null
}

const initialState: IAuthState = {
   isLoading: false,
   isError: null
}
const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {},
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

export default authSlice.reducer