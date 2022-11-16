import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { CookingStagesDetails } from '../../components/RecipePage/CookingStagesDetails';
import { IngredientsDetails } from '../../components/RecipePage/IngredientsDetails';
import { MainInfoDetails } from '../../components/RecipePage/MainInfoDetails';
import { useAppDispatch } from '../../core/hooks/useAppDispatch';
import { useAppSelector } from '../../core/hooks/useAppSelector';
import { getRecipeDetailsThunk } from '../../store/recipeCards/recipeDetails/recipeDetails.thunk';
import { Loader } from '../../ui/Loader/Loader';
import './index.scss';

export const RecipePage: React.FC = () => {
   const { id } = useParams();
   const dispatch = useAppDispatch();
   const details = useAppSelector(x => x.recipeCards.recipeDetails.details);
   const isLoading = useAppSelector(x => x.recipeCards.recipeDetails.isLoading);
   const isError = useAppSelector(x => x.recipeCards.recipeDetails.error);

   useEffect(() => {
      dispatch(getRecipeDetailsThunk(Number(id)))
   }, [])

   return (
      <>
      {isLoading 
         ? <Loader loading={isLoading} fullScreen/>
         :  !isError &&
               <div className='recipe_details_wrapper'>
                     <div className='recipe_details'>
                        <MainInfoDetails recipe={details?.recipeCard!} remark={details?.remark}/>
                        <IngredientsDetails ingredients={details?.ingredients!}/>
                        <CookingStagesDetails stages={details?.stages!}/>
                     </div>
                  </div> }
      <ToastContainer autoClose={2000}/>
      </>
   )
}