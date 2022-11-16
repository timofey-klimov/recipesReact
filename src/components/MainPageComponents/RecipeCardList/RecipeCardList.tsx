import React from 'react';
import { IRecipeCard } from '../../../models/recipes/recipeCard.model';
import { RecipeCard } from '../RecipeCard/RecipeCard';
import './RecipeCardList.scss';

interface IProps {
   cards?: IRecipeCard[],
   onClick:(id: number) => void
}

export const RecipeCardList: React.FC<IProps> = ({cards, onClick}) => {

   return (
      <>
      <div className='recipe__cards'>
         {cards?.map(recipe => (
            <RecipeCard 
               id={recipe.id!} 
               title={recipe.title}
               imageSource={recipe.imageSource}
               key={recipe.id} 
               onClick={onClick}/>
         ))}
      </div>
      </>
   )
}