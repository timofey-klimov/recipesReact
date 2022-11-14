import React, { useEffect } from 'react';
import { useAppDispatch } from '../../core/hooks/useAppDispatch';
import { useAppSelector } from '../../core/hooks/useAppSelector';
import { fetchRecipeCardsThunk } from '../../store/recipeCards/getRecipeCards/getRecipeCards.thunk';
import { Loader } from '../../ui/Loader/Loader';
import { RecipeCard } from '../RecipeCard/RecipeCard';
import './RecipeCardList.scss';

export const RecipeCardList: React.FC = () => {

   const dipatch = useAppDispatch();
   const cards = useAppSelector(x => x.recipeCards.cards.pageData?.data);
   const loading = useAppSelector(x => x.recipeCards.cards.isLoading);
   
   useEffect(() => {
      dipatch(fetchRecipeCardsThunk())
   }, [])

   return (
      <>
      <Loader loading={loading}/>
      <div className='recipe__cards'>
         {cards?.map(recipe => (
            <RecipeCard {...recipe} key={recipe.id}/>
         ))}
      </div>
      </>
   )
}