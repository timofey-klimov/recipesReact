import { FormControl, FormErrorMessage, FormLabel, Input, RequiredIndicator, Select, Textarea } from "@vechaiui/react";
import React, { ReactNode, useEffect } from "react"
import { useFormContext } from "react-hook-form";
import { FilePicker } from "../../../../ui/FilePicker/FilePicker";
import './index.scss';

export const RecipeMainInfoForm: React.FC = () => {

   const { register, formState: { errors, touchedFields, isSubmitted } } = useFormContext();

   const errorMessageForTitle = (): ReactNode => {
      return (touchedFields?.title || isSubmitted)
         && errors.title 
         && errors.title.type=='required' 
         && <FormErrorMessage>Название должно быть заполнено</FormErrorMessage>
   }

   const errorMessageForImage = (): ReactNode => {
      return (touchedFields.image || isSubmitted)
         && errors.image 
         && errors.image.type=='required' 
         && <FormErrorMessage>Картинка обязательна</FormErrorMessage>
   }

   return (
      <>
      <FormControl invalid={Boolean(errors.title)}>
         <FormLabel>
            Название рецепта<RequiredIndicator/>
         </FormLabel>
         <Input 
            {...register('title', {required: true})} 
         />
         {errorMessageForTitle()}
      </FormControl>

      <FormControl style={{
         marginTop: 15
      }}>
         <FormLabel>
            Тип<RequiredIndicator/>
         </FormLabel>
         <Select 
            {...register('mealType', {required: true})}
         >
            <option value={0}>салат</option>
            <option value={1}>суп</option>
            <option value={2}>мясные блюда</option>
            <option value={3}>завтрак/перекус</option>
            <option value={4}>гарниры</option>
            <option value={5}>выпечка</option>
            <option value={6}>десерт</option>
            <option value={7}>соления</option>
         </Select>
      </FormControl>
      
      <FormControl style={{
         marginTop: 15
      }}>
         <FormLabel>
            Рекомендации
         </FormLabel>
         <Textarea 
            {...register('remark')}/>
      </FormControl>

      <FormControl style={{
         marginTop: 15
      }}>

         <FormLabel>
            Изображение<RequiredIndicator/>
         </FormLabel>

         <FilePicker 
            imgDims={{
               maxHeight: 1200, 
               maxWidth: 1600,
               minHeight: 600,
               minWidth: 800,
            }}
            validationOpts={
               {shouldValidate: true}
            }
            name = 'image'  
         />
         {errorMessageForImage()}
      </FormControl>
      </>
   )
}