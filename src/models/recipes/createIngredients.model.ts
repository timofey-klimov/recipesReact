export interface ICreateIngredientsRequest {
   id: number,
   ingredients: {
      name: string,
      quantity: string
   }[]
}