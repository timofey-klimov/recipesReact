import React from 'react';
import { ToastContainer } from 'react-toastify';
import { RecipeCardList } from '../../components/RecipeCardList/RecipeCardList';

export const MainPage: React.FC = () => {
   return (
      <>
         <RecipeCardList/>
         <ToastContainer autoClose={2000}/>
      </>
   )
}