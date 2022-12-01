import { checkUserExistsAsync } from "../../../core/api/user.api";

export async function validateLoginSignUpAsync(value: string): Promise<boolean> {
   const response = await checkUserExistsAsync(value);
   ///Показываем ошибку только при правильном ответе от сервера
   if (response.success) {
      return !response.data!;
   } else {
      return true;
   }
}

export async function validateEmailSignUpAsync(value: string): Promise<boolean> {
   const response = await checkUserExistsAsync(value);
   ///Показываем ошибку только при правильном ответе от сервера
   if (response.success) {
      return !response.data!;
   } else {
      return true;
   }
}