import { SignInRequest } from "../../models/auth/SignInRequest";
import { SignUpRequest } from "../../models/auth/SignUpRequest";
import { getAsync, postAsync } from "./api.core";
import { IApiResponse } from "./respose.model";

export async function checkUserExistsAsync(userInfo: string): Promise<IApiResponse<boolean>> {
   return getAsync(`users/check/${userInfo}`)
}

export async function signUpAsync(params: SignUpRequest): Promise<IApiResponse<string>> {
   return postAsync('users/sign-up', params);
}

export async function signInAsync(body: SignInRequest): Promise<IApiResponse<string>> {
   return postAsync('users/sign-in', body);
}