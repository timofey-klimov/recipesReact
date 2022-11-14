export interface ICreateRecipeRequest {
   title: string,
   mealType: string,
   remark: string,
   image: File,
   ingredients: {
      name: string,
      quantity: string
   }[],
   stages: {
      image: File | null,
      description: string
   }[]
}