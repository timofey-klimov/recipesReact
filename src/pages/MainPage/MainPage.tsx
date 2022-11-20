import React, { useEffect, useState } from 'react';
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
   const [page, setPage] = useState<number>(1);
   console.log(page);
   const cards = useAppSelector(x => x.recipeCards.cards.pageData?.data);
   const loading = useAppSelector(x => x.recipeCards.cards.isLoading);
   const totalPage = useAppSelector(x => x.recipeCards.cards.pageData?.totalPages);

   useEffect(() => {
      console.log(page);
      if (page == 1 || (totalPage && page - 1 < totalPage))
         dipatch(fetchRecipeCardsThunk(page))
   }, [page])

   return (
      <>
         <RecipeCardList 
            cards={cards} 
            onClick={(id) => navigate(`/recipe/${id}`)}
            onIntersect={() =>  {
               if (totalPage && page < totalPage) {
                  setPage((prev) => prev + 1)
               }
            }}
            />
         <ToastContainer autoClose={2000}/>
         <Loader loading={loading} fullScreen/>
      </>
   )
}