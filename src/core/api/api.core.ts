import axios from "axios";
import { authService } from "../services/authService";
import { apiUrl } from "./apiSettings";
import { BaseResponse, ErrorResponse, IApiResponse, PaginationResponse, ServerResponse } from "./respose.model";

const authHeaders = function() {
   const { token, isAuth } = authService();
   return isAuth ? { Authorization: `Bearer ${token}`} : {}
}

export async function getAsync<T>(url: string, params?: {[key: string]: string | number}): Promise<IApiResponse<T>> {
   const { token, isAuth } = authService();
   try {
      const queryUrl = `${apiUrl}/api/${url}`;
      const response = await axios.get<ServerResponse<T>>(queryUrl, {
         params: params,
         headers: authHeaders()
      });
      const data = response.data as BaseResponse<T>;
      return {
         success: data.success,
         data: data.data,
      }
   } catch(e:any) {
      const data = e?.response?.data as ErrorResponse;
      return {
         success : false,
         code: e?.response?.status,
         error: data?.description
      } as IApiResponse<T>
   }
}

export async function getPageAsync<T>(url: string, params?: {[key: string]: string | number}): Promise<PaginationResponse<T>> {
   try {
      const queryUrl = `${apiUrl}/api/${url}`;
      const response = await axios.get<PaginationResponse<T>>(queryUrl, {
         params,
         headers: authHeaders()
      });
      return response.data;
   } catch(e) {
      return {
         success: false
      } as PaginationResponse<T>
   }
}

export async function postAsync<T>(url: string, body: any): Promise<IApiResponse<T>> {
   try {
      const queryUrl = `${apiUrl}/api/${url}`;
      const response = await axios.post<ServerResponse<T>>(queryUrl, body, {
         headers: authHeaders()
      });
      const data = response.data as BaseResponse<T>;
      return {
         success: data.success,
         data: data.data,
      }
   } catch(e:any) {
      const data = e?.response?.data as ErrorResponse;
      return {
         success : false,
         code: e?.response?.status,
         error: data?.description
      } as IApiResponse<T>
   }
}