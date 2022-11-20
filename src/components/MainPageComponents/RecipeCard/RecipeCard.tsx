import React, { forwardRef, useRef } from 'react';
import { apiUrl } from '../../../core/api/apiSettings';
import './RecipeCard.scss';

interface IProps {
   id: number,
   title: string,
   imageSource: string,
   onClick: (id:number) => void;
}

export const RecipeCard = forwardRef((props: IProps, ref: React.ForwardedRef<HTMLDivElement>) => {
   return (
      <div className='recipe__card' onClick={() => props.onClick(props.id)} ref={ref}>
         <img src={`${apiUrl}${props.imageSource}`} loading='lazy'/>
         <div className='recipe__footer'>
            <img src='recipeicon.png' className='recipe_logo'/>
            <span>{props.title}</span>
         </div>
      </div>
   )
})