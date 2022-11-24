import React from 'react';
import { useNavigate } from 'react-router';
import { IRecipeCard } from '../../../../models/recipes/recipeCard.model';
import { SearchItem } from '../SearchItem';
import './index.scss';

interface IProps {
   recipes: IRecipeCard[] | undefined;
   onClick: () => void;
   shouldShow: boolean 
}

export const SearchItems: React.FC<IProps> = ({recipes, onClick, shouldShow}) => {
   const navigate = useNavigate();

   const handleClick = (id: number) => {
      onClick();
      navigate(`/recipe/${id}`);
   }

   return (
      <div className='search_items'>
         {
            recipes && shouldShow &&
            <ul>
               {
                  recipes.map((recipe,index) => {
                     return (
                        <SearchItem
                           id={recipe.id!}
                           title={recipe.title}
                           onClick={handleClick}
                           key={index}/>
                     )
                  })
               }
            </ul>
         }
      </div>
   )
}