import React from 'react';
import { apiUrl } from '../../core/api/apiSettings';
import './RecipeCard.scss';

interface IProps {
   title: string,
   imageSource: string
}

export const RecipeCard: React.FC<IProps> = (props: IProps) => {
   return (
      <div className='recipe__card'>
         <img src={`${apiUrl}${props.imageSource}`} loading='lazy'/>
         <div className='recipe__footer'>
            <img src='recipeicon.png' className='recipe_logo'/>
            <span>{props.title}</span>
         </div>
      </div>
   )
}