import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInAsync } from "../../../core/api/user.api";
import { authService } from "../../../core/services/authService";
import { SignInRequest } from "../../../models/auth/SignInRequest";

export const signInThunk = createAsyncThunk<void,SignInRequest,{rejectValue: string}>(
   'auth/signUp',
   async function(data: SignInRequest, {rejectWithValue}) {
      const { setToken } = authService();
      const response = await signInAsync(data);

      if (!response.success) {
         const message = response.code === 409
            ? response.error
            : 'Ошибка, попробуйте позже';
         return rejectWithValue(message!);
      }

      setToken(response.data!)
   }
)