import React from 'react';
import './CreateRecipePage.scss';
import { FormProvider, useForm } from 'react-hook-form';
import { RecipeMainInfoForm } from '../../components/CreateRecipeForm/MainInfoForm';
import { IngredientsForm } from '../../components/CreateRecipeForm/IngredientsForm/IngredientsForm';
import { CookingStageForm } from '../../components/CreateRecipeForm/CookingStageForm';
import { PrimaryButton } from '../../ui/PrimaryButton/PrimaryButton';
import { useAppDispatch } from '../../core/hooks/useAppDispatch';
import { createRecipeCardThunk } from '../../store/recipeCards/createRecipe/createRecipeCard.thunk';
import { useAppSelector } from '../../core/hooks/useAppSelector';
import { Loader } from '../../ui/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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
   const isLoading = useAppSelector(x => x.recipeCards.createCard.isLoading);

   const onSubmit = (data: FormValues) => {
      dispath(createRecipeCardThunk(data))
         .unwrap()
         .then(() =>{
            methods.reset()
         })
   }
   
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
                     <PrimaryButton type='submit'>Создать рецепт</PrimaryButton>
                  </div>
               </form>
            </FormProvider>
         </div>
      </div>
      <Loader loading={isLoading} fullScreen/>
      <ToastContainer autoClose={2000}/>
      </>
   )
}