import React from 'react';
import { IRecipeCard } from '../../models/recipes/recipeCard.model';
import { RecipeCard } from '../RecipeCard/RecipeCard';
import './RecipeCardList.scss';

interface IProps {
   cards?: IRecipeCard[]
}

export const RecipeCardList: React.FC<IProps> = ({cards}) => {

   return (
      <>
      <div className='recipe__cards'>
         {cards?.map(recipe => (
            <RecipeCard {...recipe} key={recipe.id}/>
         ))}
      </div>
      </>
   )
}