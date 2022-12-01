import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { RecipeCardList } from '../../components/pages/MainPageComponents/RecipeCardList/RecipeCardList';
import { useAppDispatch } from '../../core/hooks/useAppDispatch';
import { useAppSelector } from '../../core/hooks/useAppSelector';
import { changePage } from '../../store/recipeCards/getRecipeCards/getRecipeCards.slice';
import { fetchRecipeCardsThunk, initFetchRecipeCardsThunk } from '../../store/recipeCards/getRecipeCards/getRecipeCards.thunk';
import { Loader } from '../../ui/Loader/Loader';

export const MainPage: React.FC = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const search = useAppSelector(x => x.search.searchValue);
   const page = useAppSelector(x => x.recipeCards.cards.page);
   const cards = useAppSelector(x => x.recipeCards.cards.pageData?.data);
   const loading = useAppSelector(x => x.recipeCards.cards.isLoading);
   const totalPage = useAppSelector(x => x.recipeCards.cards.pageData?.totalPages);

   useEffect(() => {
      dispatch(initFetchRecipeCardsThunk(search))
   }, [search])

   useEffect(() => {
      if (page != 1 && (totalPage && page < totalPage))
         dispatch(fetchRecipeCardsThunk({page, search}))
   }, [page])

   return (
      <>
         <RecipeCardList 
            cards={cards} 
            onClick={(id) => navigate(`/recipe/${id}`)}
            onIntersect={() =>  {
               if (totalPage && page < totalPage) {
                  if (page + 1 == totalPage) {
                     dispatch(fetchRecipeCardsThunk({page: page + 1, search}))
                  }
                  dispatch(changePage(page + 1))
               } 
            }}
            onLastPage={() => totalPage == page}
            />
         <Loader loading={loading} fullScreen/>
      </>
   )
}