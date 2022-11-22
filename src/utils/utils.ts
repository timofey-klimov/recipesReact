export function clearArray<T>(array: Array<T>) {
   if (!array || array.length == 0) {
      return;
   }

   while (array.length != 0) {
      array.pop();
   }
}