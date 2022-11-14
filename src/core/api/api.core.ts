import axios, { AxiosError } from "axios";
import { apiUrl } from "./apiSettings";
import { IApiResponse, PaginationResponse, ServerResponse } from "./respose.model";

export async function getAsync<T>(url: string): Promise<IApiResponse<T>> {
   try {
      const queryUrl = `${apiUrl}/api/${url}`;
      const response = await axios.get<ServerResponse<T>>(queryUrl);
      return {
         success: response.data.success,
         data: response.data.data,
         error: response.data.description,
         code: response.status

      }
   } catch(e:any) {
      const data = e?.response?.data;
      return {
         success : false,
         code: e?.response?.status,
         error: data?.description
      } as IApiResponse<T>
   }
}

export async function getPageAsync<T>(url: string): Promise<PaginationResponse<T>> {
   try {
      const queryUrl = `${apiUrl}/api/${url}`;
      const response = await axios.get<PaginationResponse<T>>(queryUrl);
      return response.data;
   } catch(e) {
      return {
         success: false
      } as PaginationResponse<T>
   }
}

export async function postAsync<T>(url: string, data: any): Promise<IApiResponse<T>> {
   try {
      const queryUrl = `${apiUrl}/api/${url}`;
      const response = await axios.post<ServerResponse<T>>(queryUrl, data);
      return {
         data: response.data.data,
         code: response.status,
         error: response.data.description,
         success: response.data.success
      }
   } catch (e: any) {
      const data = e?.response?.data;
      return {
         success : false,
         code: e?.response?.status,
         error: data?.description
      } as IApiResponse<T>
   }
}