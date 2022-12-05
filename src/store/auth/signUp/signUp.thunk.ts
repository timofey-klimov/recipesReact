import { createAsyncThunk } from "@reduxjs/toolkit";
import { signUpAsync } from "../../../core/api/user.api";
import { authService } from "../../../core/services/authService";
import { SignUpRequest } from "../../../models/auth/SignUpRequest";


export const signUpThunk = createAsyncThunk<void,SignUpRequest,{rejectValue: boolean}>(
   'auth/signUp',
   async function(data: SignUpRequest, {rejectWithValue}) {
      const { setToken } = authService();
      const response = await signUpAsync(data);

      if (!response.success) {
         return rejectWithValue(true);
      }

      setToken(response.data!)
   }
)