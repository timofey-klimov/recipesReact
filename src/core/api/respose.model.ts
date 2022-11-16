export type BaseResponse<T> = {
   success: boolean,
   data: T | null
}

export type ErrorResponse = {
   description?: string
}

export type ServerResponse<T> = BaseResponse<T> | ErrorResponse;

export interface PaginationResponse<T> {
   success: boolean;
   data: T[];
   count?: number;
   itemsPerPage?: number;
}

export interface IApiResponse<T> {
   success: boolean;
   data?: T | null,
   code?: number,
   error?: string | null
}