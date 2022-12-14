import React, { useEffect } from 'react';
import './CreateRecipePage.scss';
import { FormProvider, useForm } from 'react-hook-form';
import { RecipeMainInfoForm } from '../../components/pages/CreateRecipePage/MainInfoForm';
import { IngredientsForm } from '../../components/pages/CreateRecipePage/IngredientsForm/IngredientsForm';
import { CookingStageForm } from '../../components/pages/CreateRecipePage/CookingStageForm';
import { PrimaryButton } from '../../ui/PrimaryButton/PrimaryButton';
import { useAppDispatch } from '../../core/hooks/useAppDispatch';
import { createRecipeCardThunk } from '../../store/recipeCards/createRecipe/createRecipeCard.thunk';
import { useAppSelector } from '../../core/hooks/useAppSelector';
import { Loader } from '../../ui/Loader/Loader';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router';
import { clearSearch } from '../../store/search/search.slice';
import { useEventBus } from '../../core/hooks/useEventBus';
import { ComponentEvents } from '../../core/eventBus/events';

type FormValues = {
   title: string,
   mealType: string,
   remark: string,
   image: File,
   ingredients: {
      name: string,
      quantity: string
   }[],
   stages: {
      image: File | null,
      description: string
   }[]
}

export const CreateRecipePage: React.FC = () => {
   const methods = useForm<FormValues>({
      mode: 'onBlur'
   })
   const dispath = useAppDispatch();
   const navigate = useNavigate();
   const {  dispatch } = useEventBus();
   const isLoading = useAppSelector(x => x.recipeCards.createCard.isLoading);

   const onSubmit = (data: FormValues) => {
      dispath(createRecipeCardThunk(data))
         .unwrap()
         .then(() =>{
            navigate('/');
         })
   }
   
   useEffect(() => {
      dispatch(ComponentEvents.ClearSearchEvent)
   },[])

   return (
      <>
      <div className='create_form_wrapper'>
         <div className='create__form'>
            <FormProvider {...methods}>
               <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <RecipeMainInfoForm/>
                  <IngredientsForm/>
                  <CookingStageForm />
                  <div style={{
                     display: 'flex',
                     justifyContent: 'end',
                     marginTop: 10
                  }}>
                     <PrimaryButton type='submit'>?????????????? ????????????</PrimaryButton>
                  </div>
               </form>
            </FormProvider>
         </div>
      </div>
      <Loader loading={isLoading} fullScreen/>
      </>
   )
}