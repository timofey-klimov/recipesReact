import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { RecipeCardList } from '../../components/MainPageComponents/RecipeCardList/RecipeCardList';
import { useAppDispatch } from '../../core/hooks/useAppDispatch';
import { useAppSelector } from '../../core/hooks/useAppSelector';
import { fetchRecipeCardsThunk } from '../../store/recipeCards/getRecipeCards/getRecipeCards.thunk';
import { Loader } from '../../ui/Loader/Loader';

export const MainPage: React.FC = () => {
   const dipatch = useAppDispatch();
   const navigate = useNavigate();
   const cards = useAppSelector(x => x.recipeCards.cards.pageData?.data);
   const loading = useAppSelector(x => x.recipeCards.cards.isLoading);

   useEffect(() => {
      dipatch(fetchRecipeCardsThunk())
   }, [])
   
   return (
      <>
         <RecipeCardList cards={cards} onClick={(id) => navigate(`/recipe/${id}`)}/>
         <ToastContainer autoClose={2000}/>
         <Loader loading={loading} fullScreen/>
      </>
   )
}