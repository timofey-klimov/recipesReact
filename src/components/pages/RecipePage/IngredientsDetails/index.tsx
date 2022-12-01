import React from "react";
import { IIngredient } from "../../../../models/recipes/ingredient.model";
import './index.scss';

interface IProps {
   ingredients: IIngredient[] | null
}

export const IngredientsDetails: React.FC<IProps> = ({ingredients}) => {
   return (
      <div className="ingredients_info">
         <div className="ingredients_header">
            <img src="/ingredientIcon.png"/>
            <p>Ингредиенты</p>
         </div>
         <div className="ingredient_content">
            {ingredients?.map((ingredient,index) => {
               return (
                  <>
                     <p key={`name${ingredient.id}`}>
                        {index+1}. {ingredient.name}
                     </p>
                     <p key={`quantity${ingredient.id}`}>
                        {ingredient.quantity}
                     </p>
                  </>
               )
            })}
         </div>
      </div>
   )
}