import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { RecipeCardList } from '../../components/RecipeCardList/RecipeCardList';
import { useAppDispatch } from '../../core/hooks/useAppDispatch';
import { useAppSelector } from '../../core/hooks/useAppSelector';
import { fetchRecipeCardsThunk } from '../../store/recipeCards/getRecipeCards/getRecipeCards.thunk';
import { Loader } from '../../ui/Loader/Loader';

export const MainPage: React.FC = () => {
   const dipatch = useAppDispatch();
   const cards = useAppSelector(x => x.recipeCards.cards.pageData?.data);
   useEffect(() => {
      dipatch(fetchRecipeCardsThunk())
   }, [])
   const loading = useAppSelector(x => x.recipeCards.cards.isLoading);
   return (
      <>
         <RecipeCardList cards={cards}/>
         <ToastContainer autoClose={2000}/>
         <Loader loading={loading} fullScreen/>
      </>
   )
}