import { Button, FormControl, FormErrorMessage, FormLabel, Input, RequiredIndicator } from '@vechaiui/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PrimaryButton } from '../../../../ui/PrimaryButton/PrimaryButton';
import './index.scss';

interface SignInValues {
   credential: string,
   password: string,
}

interface IProps {
   submit: (data: SignInValues) => void;
   error: string | null,
   onload?: () => void;
   isLoading: boolean;
}

export const SignIn: React.FC<IProps> = ({ submit, error, onload, isLoading }) => {
   const { register, formState: { errors }, handleSubmit } = useForm<SignInValues>({
      mode: 'onBlur'
   })
   const [showPassword, setShowPassword] = useState(false);
   

   useEffect(() => {
      if (onload) {
         onload();
      }
   },[])

   const handleShowPassword = () => setShowPassword(!showPassword);

   const onSubmit = (data: SignInValues) => {
      submit(data);
   }

   return (
      <>
      {error && 
         <div className='singIn__error'>
            {error}
         </div>}
         <form 
            style={{
               padding: '0 20px'
            }}
            onSubmit={handleSubmit(onSubmit)}
         >
            <FormControl invalid={Boolean(errors.credential)}>
               <FormLabel>
                  Логин<RequiredIndicator/>
               </FormLabel>
               <Input 
                  placeholder='Логин или email'
                  {...register('credential', { required: true })}
               />
               { errors?.credential?.type == 'required' 
                  && <FormErrorMessage>Логин обязателен</FormErrorMessage> }
            </FormControl>
            <FormControl 
               style={{
                  marginTop: 30
               }}
               invalid={Boolean(errors.password)}
            >
               <FormLabel>
                  Пароль<RequiredIndicator/>
               </FormLabel>
               <Input.Group>
                  <Input 
                     placeholder='Введите пароль'
                     {...register('password', { required: true })}
                     type={showPassword ? 'text' : 'password'}
                  />
                  <Input.RightElement className='w-16'>
                     <Button
                        type='button' 
                        size='xs'
                        variant='solid' 
                        onClick={handleShowPassword}
                        style={{
                           marginRight: '30px'
                        }}
                     >
                        {showPassword ? 'Скрыть' : 'Показать'}
                     </Button>
                  </Input.RightElement>
               </Input.Group>
               { errors?.password?.type == 'required' 
                  && <FormErrorMessage>Пароль обязателен</FormErrorMessage> }
            </FormControl>

            <PrimaryButton 
                  style={{
                  width: '100%',
                  marginTop: 30,
               }}
               loading={isLoading}
            >
               Войти
            </PrimaryButton>
         </form>
      </>
   )
}