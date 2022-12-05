import { FormControl, FormErrorMessage, FormLabel, RequiredIndicator, Textarea } from '@vechaiui/react';
import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import { FilePicker } from '../../../../ui/FilePicker/FilePicker';
import { PrimaryButton } from '../../../../ui/PrimaryButton/PrimaryButton';
import './index.scss';

type FormValues = {
   stages: {
      image?: File,
      description: string
   }[]
}

export const CookingStageForm: React.FC = () => {

   const { register, formState: { errors } } = useFormContext<FormValues>();
   const { fields, append, remove } = useFieldArray({
      name: "stages",
      rules: { required: 'Добавьте хотя бы 1 шаг'}
    });

   useEffect(() => {
      append({image: undefined, description: ''}, {shouldFocus: false})
   },[])

   const addStage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      append({image: undefined, description: ''})
   }

   return (
      <>
      <FormControl style={{
         marginTop: 15
      }}>
         <FormLabel>
            Шаги рецепта<RequiredIndicator/>
         </FormLabel>
      </FormControl>

      {fields.map((el, index) => {
         return (
            <div className='stage_form' key={el.id}>
               <div className='stage_header'>
                  <h2>Шаг {index + 1}</h2>   
                  <FaTrash 
                        color='#FF4E14' 
                        onClick={() => remove(index)} style={{
                        cursor: 'pointer',
                        marginLeft: 7
                        }}
                     />
               </div>
               <div className='main_info'>
                  <FilePicker 
                     name={`stages.${index}.image`}
                     imgDims={{
                        maxHeight: 1200, 
                        maxWidth: 1600,
                        minHeight: 400,
                        minWidth: 600,
                     }}
                     validationOpts={
                        {shouldValidate: false}
                     }
                  />
                  <FormControl invalid={Boolean(Boolean(errors?.stages?.[index]?.description))}>
                     <Textarea {...register(`stages.${index}.description`, {required: true})} style={{
                        height:180
                     }}/>
                  </FormControl>
               </div>
            </div>
         )
      })}

      {errors?.stages?.root && <FormErrorMessage>Добавьте хотя бы 1 элемент</FormErrorMessage>}

      <div style={{
         display: 'flex',
         justifyContent: 'center',
         marginTop: 15,
      }}>
         <PrimaryButton 
            style={{
               width: 180
            }}
            onClick= {addStage}
         >
            Добавить шаг
         </PrimaryButton>
      </div>

      </>
   )
}