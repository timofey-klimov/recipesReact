import { Button, FormControl, FormErrorMessage, FormLabel, Input, RequiredIndicator } from "@vechaiui/react";
import React, { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { PrimaryButton } from "../../../../ui/PrimaryButton/PrimaryButton";
import './IngredientsForm.scss';

type FormValues = {
   ingredients: {
      name: string,
      quantity: string
   }[]
}

export const IngredientsForm: React.FC = () => {

   const { register, formState: { errors } } = useFormContext<FormValues>();
   const { fields, append, remove } = useFieldArray({
      name: "ingredients",
      rules: { required: 'Добавьте хотя бы 1 ингредиент'}
    });

    useEffect(() => {
      append({name: '', quantity: ''}, {shouldFocus: false})
    }, [])

   const appendHandle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      append({name: '', quantity: ''});
   }

   return (
      <>
      <FormControl style={{
         marginTop: 15
      }}>
         <FormLabel>
            Ингредиенты<RequiredIndicator/>
         </FormLabel>
         
         {fields.map((field, index) => {
            return (
               <div className="ingredients_form" key={field.id}>
                  <FormControl invalid={Boolean(errors?.ingredients?.[index]?.name)}>
                     <Input 
                        {...register(`ingredients.${index}.name`, {required: true})}
                        placeholder={'Название'}
                        style={{
                           marginRight: 20
                        }}
                     />
                  </FormControl>
                  <FormControl invalid={Boolean(errors?.ingredients?.[index]?.quantity)} className='action_block'>
                     <Input 
                        {...register(`ingredients.${index}.quantity`, {required: true})}
                        placeholder={'Кол-во'}
                     />
                     <FaTrash 
                        color='#FF4E14' 
                        onClick={() => remove(index)} style={{
                        cursor: 'pointer'
                        }}
                     />
                  </FormControl>
               </div>
            )
         })}
         {errors?.ingredients?.root && <FormErrorMessage>Добавьте хотя бы 1 элемент</FormErrorMessage>}

         <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 10
         }}>
            <PrimaryButton onClick={appendHandle} style={{
               width: 180
            }}>Добавить ингредиент</PrimaryButton>  
         </div>
      </FormControl>
      </>
   )
} 